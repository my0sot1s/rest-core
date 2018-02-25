import * as commons from './commons'
import WebSocket from 'ws'
const debug = require('debug')('wsb-server');

let userInfor = []

export const connectToWebsocket = (ws, req, wss) => {
    ws.ip = req.connection.remoteAddress || req.headers['x-forwarded-for'];
    ws.room = []
    ws.isAlive = true
    // send cid
    let cid = commons.GenerateId('c')
    ws.send(JSON.stringify({
        mid: commons.GenerateId('m'),
        cid,
        msg: `${ws.ip} joined`
    }))
    debug('peole connected', cid)
    ws.addListener('pong', commons.heartbeat)
    ws.addListener('message', message => {
        debug('message: ', message)
        messageEventHandler(ws, JSON.stringify({
            own: ws.ip,
            ...JSON.parse(message)
        }), wss)
    })

    ws.addListener('error', (...args) => {
        debug('error ', args)
    })
    ws.addListener('close', (...args) => {
        debug('close ', args)
    })
}


let messageEventHandler = (ws, message, wss) => {
    let dataSender = JSON.parse(message)
    switch (dataSender.type) {
        case commons.SESSION_JOIN:
            userRequestJoin(ws, dataSender)
            break
        case commons.SESSION_LEFT:
            userRequestLeft(ws, dataSender)
            break
        default: break
    }
    commons.getRoomName(dataSender) && broadcastMessages(message, wss)
}


let userRequestJoin = (ws, dataSender) => {
    ws.room.push(dataSender.room)
    if (userInfor.filter(v => v.cid === dataSender.cid).length > 0) return
    userInfor = [...userInfor,
    {
        cid: dataSender.cid,
        room: dataSender.room
    }]
    debug(`${dataSender.cid} joined ${dataSender.room}`)
}

let userRequestLeft = (ws, dataSender) => {
    // get room has roomName
    ws.room = ws.room.filter(v => v !== dataSender.room)
    // get cid
    userInfor = userInfor.filter(v => v.cid !== dataSender.cid)
    debug(`${dataSender.cid} left ${dataSender.room}`)
}

let broadcastMessages = (message, wss) => {
    let broadcastMessage = { ...JSON.parse(message), mid: commons.GenerateId('m') }
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client.room.indexOf(broadcastMessage.room) > -1) {
            client.send(JSON.stringify({ ...broadcastMessage, ip: wss.clients.ip }))
        }
    })
}