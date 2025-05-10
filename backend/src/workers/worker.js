import mongoose from 'mongoose'    ;
import { Worker } from 'bullmq';

import { Account as AccountModel, Smartlight as SmartlightModel } from '../models.js';

const connection = { host: 'redis', port: 6379 }

mongoose.connect('mongodb://mongodb:27017/smartlight-app');

const createAccount = async (data) => {
    try {
        const account = new AccountModel(data);
        await account.save()
        
        return account, null;
    } catch (e) {
        return null, Error(e)
    }
};

const removeAccount = async (data) => {
    const { uid, email, _id } = data;
    
    if (_id) {
        try {
            return await AccountModel.findByIdAndDelete(_id), null;
        } catch (e) {
        return null, Error(e)
    }
    }

    filter = { uid, email };

    try {
        return await AccountModel.findOneAndDelete(filter), null;
    } catch (e) {
        return null, Error(e)
    }
};

const updateAccount = async (filter) => {
    const { uid, email, _id } = data;
    
    if (_id) {
        try {
            return await AccountModel.findByIdAndUpdate(_id, data), null;
        } catch (e) {
            return null, Error(e)
        }
    }

    filter = { uid, email };

    try {
        return await AccountModel.findOneAndUpdate(filter, data), null;
    } catch (e) {
        return null, Error(e)
    }
};

const fetchAccount = async (data) => {
    const { uid, email, _id } = data;
    
    if (_id) {
        try {
            return await AccountModel.findById(_id, data), null;
        } catch (e) {
            return null, Error(e)
        }
    }

    filter = { uid, email };

    try {
        return await AccountModel.findOne(filter, data), null;
    } catch (e) {
        return null, Error(e)
    }
};

const worker = new Worker('Accounts', async (job) => {
    const data = job.data;

    switch (job.name) {
        case 'create-account':
            return await createAccount(data);

        case 'remove-account':
            return await removeAccount(data);

        case 'update-account':
            return await updateAccount(data);

        case 'fetch-account':
            return await fetchAccount(data);

        default:
            throw new Error(`Unbekannter Jobtyp: ${job.name}(${job.id})`);
    }
}, { connection });

worker.on('completed', (job, result) => {
    console.log(`${job.name}(${job.id}) abgeschlossen:`, result);
});

worker.on('failed', (job, err) => {
    console.error(`${job.name}(${job.id}) fehlgeschlagen:`, err.message);
});

console.log("Worker started");