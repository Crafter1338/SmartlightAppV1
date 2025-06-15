/*
import { deviceWorker } from "../queues/device.js";
console.log('Device Worker#1 started!');
*/
import mongoose from 'mongoose'
import { Worker } from 'bullmq'

import { redisOpts } from '../redis.js'
import { roomWorkerHandler } from '../queues/room.js'

import cluster from 'node:cluster'

const numWorkers = 5;

mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log(`[#${process.pid}] MongoDB connected`))
	.catch((err) => console.error(`[#${process.pid}] MongoDB error:`, err))

if (cluster.isPrimary) {
	console.log(`Master [#${process.pid}] startet ${numWorkers} Worker...`)
	for (let i = 0; i < numWorkers; i++) {
		cluster.fork()
	}

	cluster.on('exit', (worker, code, signal) => {
		console.warn(`Worker [#${worker.process.pid}] ist gestorben (code ${code}) – starte neu`)
		cluster.fork()
	})
} else {
	console.log(`Worker [#${process.pid}] gestartet`)
	new Worker('roomUpdate', async (job) => {
        await roomWorkerHandler(job);
    }, {connection: redisOpts})
}