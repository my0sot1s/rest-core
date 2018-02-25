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

router['POST'.toLowerCase()]('/', (req, res) => {
    let body = req.body
    if (body && typeof body === 'object')
        services.INSERT(body)
            .then(data => {
                res.json(data)
            })
    else res.json(errorReq)
})

router['DELETE'.toLowerCase()]('/:id', (req, res) => {
    let id = req.params.id
    if (id)
        services.DELETE(id)
            .then(data => {
                res.json(data)
            })
    else res.json(errorReq)
})

export default router