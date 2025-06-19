import { deviceModel } from '../models.js'
import { redis } from '../redis.js'

const update = async ({ uid, device, timestamp }) => {
	try {
		await deviceModel.findOneAndUpdate({ uid }, { ...device, uid })

		const current = await redis.get(`device:${uid}`)
		if (current) {
			const parsed = JSON.parse(current);

			if (parsed._updated === timestamp) {
				await redis.del(`device:${uid}`)
			}
		}
	} catch {}
}

export const deviceWorkerHandler = async (job) => {
	const { uid, device, timestamp } = job.data

	switch (job.name) {
		case "update":
			await update({ uid, device, timestamp });
			break;
	}

	console.log(`[#${process.pid}] Device ${uid} erfolgreich verarbeitet (T: ${job.name}) | Job ID: ${job.id}`)
}