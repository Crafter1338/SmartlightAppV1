//import mongoose from 'mongoose'
//import { Worker } from 'bullmq'

import { roomModel } from '../models.js'
import { redis } from '../redis.js'

export const roomWorkerHandler = async (job) => {
	const { uid, room, timestamp } = job.data

	await roomModel.findOneAndUpdate({ uid }, { ...room, uid }, { upsert: true })

	const current = await redis.get(`room:${uid}`)
	if (current) {
		const parsed = JSON.parse(current)
		
		if (parsed._updated === timestamp) {
			await redis.del(`room:${uid}`)
		}
	}

	console.log(`[#${process.pid}] Room ${uid} erfolgreich verarbeitet | Job ID: ${job.id}`)
}

/*
mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.error('MongoDB error:', err))

export const roomWorker = new Worker('roomUpdate', async (job) => {
	await roomWorkerHandler(job);
}, {connection: redisOpts});
*/