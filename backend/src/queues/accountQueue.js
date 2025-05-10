import { Queue, QueueEvents } from 'bullmq';
import { v4 as uuid } from 'uuid';

const connection = { host: 'redis', port: 6379 }

const queue = new Queue('Accounts', { connection });
const queueEvents = new QueueEvents('Accounts', { connection });

const getReturn = async (job) => {
    try {
        const result = await job.waitUntilFinished(queueEvents);
        return result;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const createAccount = async(data) => {
    if (!data.email || !data.password) { return null }
    if (!data.uid) { data.uid = uuid() }

    const job = await queue.add('create-account', data);

    return await getReturn(job);
}

const removeAccount = async(data) => {
    if (!data.email && !data.uid && !data._id) { return null }

    const job = await queue.add('remove-account', data);

    return await getReturn(job);
}

const updateAccount = async(data) => {
    if (!data.email && !data.uid && !data._id) { return null }

    const job = await queue.add('update-account', data);

    return await getReturn(job);
}

const getAccount = async(data) => {
    if (!data.email && !data.uid && !data._id) { return null }

    const job = await queue.add('fetch-account', data);

    return await getReturn(job);
}

export {
    createAccount,
    removeAccount,
    updateAccount,
    getAccount,
    
    queue as AccountQueue
};