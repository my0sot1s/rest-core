const objectPath = require('object-path')

export const SESSION_CLOSE = 'session_close'
export const SESSION_JOIN = 'session_join'
export const MESSAGE_SENT = 'message_sent'
export const SESSION_LEFT = 'session_left'
export const MAX_CID = 22
const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export const GenerateId = (prefix) => {
    var res = ''
    for (var i = 0; i < MAX_CID; i++) {
        res += CHARS[Math.floor(Math.random() * (CHARS.length - 0))]
    }
    return `${prefix}${res}`
}

export function heartbeat() {
    this.isAlive = true
}

export let getRoomName = (dataSender) => {
    return objectPath.get(dataSender, 'room', null)
}
