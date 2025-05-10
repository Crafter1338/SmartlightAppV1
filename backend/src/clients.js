import { getAccount } from "./queues/accountQueue.js";
import { validateToken } from "./encryption.js"

class Client {
    constructor(socket) {
        this.socket       = socket;
        this.webId        = socket.id;
        this.accountId    = null;
        this.lastActivity = Date.now();

        socket.on('/authenticate', async (data) => {
            const { token } = data;

            if (token) {
                try {
                    const { mongoId } = validateToken(token)
                    const account = getAccount({})
                } catch (e) { console.log('Error during Authorization (token): ', e) }
            }
        })
    }
}

const clients = new Map();

const addClient = (socket) => {
    const client = new Client(socket);
    clients.set(socket.id, client);
    return client;
}

const removeClient = (webId) => {
    clients.delete(socket.id);
}

export { clients, addClient, removeClient };