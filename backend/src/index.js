import mongoose from 'mongoose'

import cors from 'cors'

import express from 'express'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import mqtt from 'mqtt'
import { Queue } from 'bullmq'

import { roomModel, homeModel, deviceModel } from './models.js'
import { redis, redisOpts } from './redis.js'

import {v4 as genUID} from 'uuid'

// Connections //
const app = express()
const server = createServer(app)
const mqttClient = mqtt.connect('mqtt://mosquitto:1883')
const io = new SocketIOServer(server, {
	cors: { origin: '*' }
})

app.use(cors({
  origin: '*',
}));

mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.error('MongoDB error:', err))

redis.on('connect', () => console.log('Redis connected'))
redis.on('error', (err) => console.error('Redis error:', err))

mqttClient.on('connect', () => {
	console.log('MQTT connected')

	mqttClient.subscribe('register'); // from device

	mqttClient.subscribe('device/+/connect'); // from device
	mqttClient.subscribe('device/+/disconnect'); // from device
	mqttClient.subscribe('device/+/data'); // from device
})

mqttClient.on('error', (err) => {
	console.error('MQTT error:', err)
})

const deviceQueue = new Queue('deviceUpdate', {
	connection: redisOpts,
})

// Bei 1.000.000 Jobs / Sekunde würde das System 584.942 (also 500 tausend) Jahre aushalten
// Oder falls nicht unsigned würde das System 292.471 Jahre aushalten --> Mach dir keine Sorgen um die scheiß Job IDS, an denen scheiterts nicht.

const roomQueue = new Queue('roomUpdate', {
	connection: redisOpts,
})

// HELPERS //
async function updateDevice(uid, device) {
	mqttClient.publish(`device/${uid}/update`, JSON.stringify({ ...device }));
	io.emit('device:update', {uid, device});

	const timestamp = Date.now();

	await redis.set(
		`device:${uid}`,
		JSON.stringify({ device, uid, _updated: timestamp }),
		'EX',
		600
	);

	deviceQueue.add('update', {uid, device, timestamp}, { removeOnComplete: true, removeOnFail: true });
}

async function updateRoom(uid, room) {
	const timestamp = Date.now();
	io.emit('room:update', {uid, room});

	await redis.set(
		`room:${uid}`,
		JSON.stringify({ room, uid, _updated: timestamp }),
		'EX',
		600
	);

	roomQueue.add('update', {uid, room, timestamp}, { removeOnComplete: true, removeOnFail: true });
}

async function getDevice(uid) {
	const current = await redis.get(`device:${uid}`)
	return current? JSON.parse(current).device : await deviceModel.findOne({uid}).lean() || null
}

async function getRoom(uid) {
	const current = await redis.get(`room:${uid}`)
	return current? JSON.parse(current).room : await roomModel.findOne({uid}).lean() || null
}

// REST //
app.get('/', (req, res) => {
  	res.send('Backend läuft')
})


app.get('/api/rooms-uids', async (req, res) => { // List of Room UIDS - HIGH FULLFILL PRIORITY, NO QUEUE
	try {
		const rooms = await roomModel.find().lean();
		const uids = rooms.map(room => room.uid);

		return res.status(200).json(uids)
	} catch (e) {
		console.log(e);
		return res.status(500).send();
	}
})


////////////////////////// CHATGPT //////////////////////////
app.get('/api/rooms', async (req, res) => {
  try {
    // 1. Alle Rooms aus MongoDB holen
    const roomsFromDb = await roomModel.find().lean();

    // 2. Alle Redis-Keys für Räume holen
    const keys = await redis.keys('room:*');

    let redisRoomsMap = new Map();

    if (keys.length > 0) {
      const values = await redis.mget(keys);

      // 3. Redis-Daten parsen und Map aufbauen: uid -> Raumdaten
      for (const val of values) {
        try {
          const parsed = JSON.parse(val);
          if (parsed && parsed.room && parsed.uid) {
            redisRoomsMap.set(parsed.uid, parsed.room);
          }
        } catch {
          // ignore parsing errors
        }
      }
    }

    // 4. MongoDB-Daten mit Redis-Daten kombinieren, Redis überschreibt
    const combinedRooms = roomsFromDb.map(room => {
      if (redisRoomsMap.has(room.uid)) {
        return redisRoomsMap.get(room.uid);
      }
      return room;
    });

    // 5. Falls es in Redis Räume gibt, die NICHT in MongoDB sind (neu), füge diese noch hinzu
    for (const [uid, room] of redisRoomsMap.entries()) {
      if (!roomsFromDb.find(r => r.uid === uid)) {
        combinedRooms.push(room);
      }
    }

    return res.status(200).json(combinedRooms);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
});
////////////////////////// CHATGPT //////////////////////////


app.get('/api/rooms/:uid', async (req, res) => { // Room Data - HIGH FULLFILL PRIORITY, NO QUEUE
	try {
		const { uid } = req.params;
		const room = await getRoom(uid);

		if (room) {
			return res.status(200).json(room);
		} else {
			return res.status(404).send();
		}
	} catch (e) {
		console.log(e);
		return res.status(500).send();
	}
})


app.get('/api/devices-uids', async (req, res) => { // List of Device UIDS - HIGH FULLFILL PRIORITY, NO QUEUE
	try {
		const devices = await deviceModel.find().lean();
		const uids = devices.map(device => device.uid);

		return res.status(200).json(uids)
	} catch (e) {
		console.log(e);
		return res.status(500).send();
	}
})


////////////////////////// CHATGPT //////////////////////////
app.get('/api/devices', async (req, res) => {
  try {
    // 1. Alle Devices aus MongoDB holen
    const devicesFromDb = await deviceModel.find().lean();

    // 2. Alle Redis-Keys für Geräte holen
    const keys = await redis.keys('device:*');

    let redisDevicesMap = new Map();

    if (keys.length > 0) {
      const values = await redis.mget(keys);

      // 3. Redis-Daten parsen und Map aufbauen: uid -> Gerätedaten
      for (const val of values) {
        try {
          const parsed = JSON.parse(val);
          if (parsed && parsed.device && parsed.uid) {
            redisDevicesMap.set(parsed.uid, parsed.device);
          }
        } catch {
          // Parsing-Fehler ignorieren
        }
      }
    }

    // 4. MongoDB-Daten mit Redis-Daten kombinieren, Redis überschreibt
    const combinedDevices = devicesFromDb.map(device => {
      if (redisDevicesMap.has(device.uid)) {
        return redisDevicesMap.get(device.uid);
      }
      return device;
    });

    // 5. Geräte, die nur in Redis sind (neu), hinzufügen
    for (const [uid, device] of redisDevicesMap.entries()) {
      if (!devicesFromDb.find(d => d.uid === uid)) {
        combinedDevices.push(device);
      }
    }

    return res.status(200).json(combinedDevices);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
});
////////////////////////// CHATGPT //////////////////////////


app.get('/api/devices/:uid', async (req, res) => { // Device Data - HIGH FULLFILL PRIORITY, NO QUEUE
	try {
		const { uid } = req.params;
		const device = await getDevice(uid);

		if (device) {
			return res.status(200).json(device);
		} else {
			return res.status(404).send();
		}
	} catch (e) {
		console.log(e);
		return res.status(500).send();
	}
})


app.get('/api/home', async (req, res) => { // Home Data - HIGH FULLFILL PRIORITY, NO QUEUE
	try {
		const home = await homeModel.findOne().lean();

		if (home) {
			return res.status(200).json(home);
		} else {
			const home = new homeModel({name: 'Zuhause', uid: genUID()});
			await home.save();

			return res.status(200).json(home);
		}
	} catch (e) {
		console.log(e);
		return res.status(500).send();
	}
})


// SocketIO //
io.on('connection', socket => {
	console.log('WebSocket connected:', socket.id)

	socket.on('device:update', async ({uid, data}) => {
		const device = await getDevice(uid);

		if (!device) { return };

		await updateDevice(uid, {...device, ...data, uid});
	})

	socket.on('room:update', async ({uid, data}) => {
		const room = await getRoom(uid);

		if (!room) { return };

		await updateRoom(uid, {...room, ...data, uid});
	})

	socket.on('disconnect', () => {
		console.log('WebSocket disconnected:', socket.id)
	})
})

// MQTT //
mqttClient.on('message', async (topic, payload) => {
	const [prefix, uid, action] = topic.split('/');

	let parsed;
	try {
		if (payload.toString().length > 0) {
			parsed = JSON.parse(payload.toString());
		}
	} catch (e) {
		console.log(e);
		return;
	}

	if (prefix == 'register') {
		const { mac, type, variant, subvariant } = parsed;
		let uid;

		if (!mac) { return };

		const fDevice = await deviceModel.findOne({ mac }).lean(); // check if the device mac is already registered 
		if (fDevice) {
			uid = fDevice.uid;

			updateDevice(uid, {...fDevice, ...parsed, uid});

			mqttClient.publish(`device/${mac}/response`, JSON.stringify({ uid }));

			return
		} else {
			uid = genUID();
		}

		const device = new deviceModel({uid, mac, type, variant, subvariant});
		await device.save();

		mqttClient.publish(`device/${mac}/response`, JSON.stringify({ uid }));

		return;
	}

	if (prefix != 'device') { return };
	if (uid.length <= 0) { return };

	const device = await getDevice(uid);
	if (!device) { return };

	switch (action){
		case 'connect':
			await updateDevice(uid, {...device, online: true});
			break;
		
		case 'disconnect':
			await updateDevice(uid, {...device, online: false});
			break;

		case 'data':
			if (!parsed) { return };
			await updateDevice(uid, {...device, data: parsed, online: true});
			break;
	}
});

// Server //
server.listen(process.env.PORT, () => {
  	console.log(`Server listening on http://192.168.2.116:${process.env.PORT}`)
})