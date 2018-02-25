import Commons from './commons'
import path, { resolve } from 'path'
import Posts from './posts'
import Albums from './albums'
import Comments from './comments'
import Feed from './feed'
import Like from './like'
import Followers from './followers'
import Users from './users'

export const GetIp = (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    res.send(res)
}

export const Pong = (req, res) => {
    res.send({ message: "Pong" })
}

export const createMappingExpress = (app) => {
    app['GET'.toLowerCase()]('/', Pong)

    app['USE'.toLowerCase()]('/commons', Commons)
    app['USE'.toLowerCase()]('/posts', Posts)
    app['USE'.toLowerCase()]('/comments', Comments)
    app['USE'.toLowerCase()]('/albums', Albums)
    app['USE'.toLowerCase()]('/feed', Feed)
    app['USE'.toLowerCase()]('/like', Like)
    app['USE'.toLowerCase()]('/followers', Followers)
    app['USE'.toLowerCase()]('/users', Users)
}

