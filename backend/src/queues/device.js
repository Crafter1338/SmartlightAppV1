//import mongoose from 'mongoose'
//import { Worker } from 'bullmq'

import { deviceModel } from '../models.js'
import { redis } from '../redis.js'

export const deviceWorkerHandler = async (job) => {
	const { uid, device, timestamp } = job.data

	try {
		await deviceModel.findOneAndUpdate({ uid }, { ...device, uid })
	} catch (e) {
		console.log(e);
	}

	const current = await redis.get(`device:${uid}`)
	if (current) {
		const parsed = JSON.parse(current);

		if (parsed._updated === timestamp) {
			await redis.del(`device:${uid}`)
		}
	}

	console.log(`[#${process.pid}] Device ${uid} erfolgreich verarbeitet | Job ID: ${job.id}`)
}

/*
mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.error('MongoDB error:', err))

export const deviceWorker = new Worker('deviceUpdate', async (job) => {
	await deviceWorkerHandler(job);
},{connection: redisOpts});
*/