/**
 * =========================
 * socket main
 * ========================
 */

import express from 'express'
import http, { createServer } from 'http'
import path, { resolve } from 'path'
import WebSocket from 'ws'
require('dotenv').config({ path: path.join(__dirname, '../.env') })
require('./logs')
require('./models')
const webPort = process.env.PORT || process.env.DEV_PORT
const { connectToWebsocket } = require('./ws/libs')

const { createMappingExpress } = require('./services/mapping')

const app = express()

const bserver = createServer(app)

createMappingExpress(app)

bserver.listen(webPort, () => {
    console.log(`Server start at ${webPort}`)
})

const wss = new WebSocket.Server({ server: bserver })

wss.addListener('connection', (ws, req) => {
    connectToWebsocket(ws, req, wss)
})

setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate()
        ws.isAlive = false;
        ws.ping()
    })
}, 30 * 1000)





