import express from 'express'
const router = express.Router()

import * as services from './helper'

let errorReq = { error: 'Request không hợp lệ' }

router['GET'.toLowerCase()]('/', (req, res) => {
    // let params = { limit, page } = req.params
    services.GET(req.params)
        .then(data => {
            res.json(data)
        })
})

export default router