import { roomModel } from '../models.js';
import { redis } from '../redis.js';

const update = async ({ uid, room, timestamp }) => {
	try {
		await roomModel.findOneAndUpdate({ uid }, { ...room, uid }, { upsert: true });

		const current = await redis.get(`room:${uid}`);
		if (current) {
			const parsed = JSON.parse(current);
			
			if (parsed._updated === timestamp) {
				await redis.del(`room:${uid}`);
			}
		}
	} catch {}
}

const add = async(room) => {
	try {
		const newRoom = new roomModel(room);
		await newRoom.save();
	} catch {}
}

const remove = async(uid) => {
	try {
		await roomModel.findOneAndDelete({ uid });
	} catch {}
}

export const roomWorkerHandler = async (job) => {
	const { uid, room, timestamp } = job.data;

	switch(job.name) {
		case "update":
			await update(uid, room, timestamp);
			break;
		
		case "add":
			await add(room);
			break;

		case "remove":
			await remove(uid);
			break;
	} 

	console.log(`[#${process.pid}] Room ${uid} erfolgreich verarbeitet (T: ${job.name}) | Job ID: ${job.id}`);
}