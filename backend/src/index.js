// Imports: //////////////////////
import nodemailer                 from 'nodemailer'  ;
import express                    from 'express'     ;
import http                       from 'http'        ;
import { Server as SocketServer } from 'socket.io'   ;
import cors                       from 'cors'        ;
import mongoose                   from 'mongoose'    ;
import { v4 as uuid }             from 'uuid'        ;

import { Account as AccountModel, Smartlight as SmartlightModel } from './models.js'

import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

// Setup: ////////////////////////
const app          = express();
const httpServer   = http.createServer(app);
const socketServer = new SocketServer(httpServer, {cors: { origin: '*' }});

const { sign, verify } = jwt;
const tokenSecret  = 'dev';

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://mongodb:27017/smartlight-app').then(() => { console.log('MongoDB verbunden') })

//////////////////////////////////
socketServer.on('connection', async (socket) => {
    console.log('Ein neuer WebClient verbunden.');

    socket.on('/update-smartlight', async (data) => {
        const { token } = data;
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log('Ein WebClient hat die Verbindung getrennt.');
    });
});

app.post('/verify', async(req, res) => {
    const { email, password, token, staySignedIn=false } = req.body;

    if (token) {
        const { uuid } = verify(token, tokenSecret)

        const account = await AccountModel.findOne({ uuid })

        if (account) { return res.status(200).json({ uuid: account._doc.uuid, email: account._doc.email }) }

        return res.status(400).json(false);
    }

    const account = await AccountModel.findOne({ email });

    console.log(account._doc)

    if (!account._doc) { return res.status(400).json(false) }

    const result = bcrypt.compareSync(password, account._doc.password);

    if (result) {
        return res.status(200).json({ token: sign({ uuid: account._doc.uuid }, tokenSecret, {'expiresIn': staySignedIn? '180d':'1d'}), uuid: account._doc.uuid, email: account._doc.email })
    }

    return res.status(400).json(false)
})

app.post('/register-account', async(req, res) => {

})

app.post('/register-smartlight', async(req, res) => {

})

httpServer.listen(3000, () => {
    console.log('Backend läuft auf http://localhost:3000');
});
