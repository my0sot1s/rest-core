import * as models from '../../models/followers'
import { validateObject } from '../../utils/validate'

export const GET = ({ limit, page }) => {
    return models.Get(limit, page)
}

export const INSERT = async (body) => {
    let updateValue = {
        own,
        follower
    } = body
    let filterUpdate = validateObject(updateValue)

    let result = await models.Insert(updateValue)
    return result
}

export const DELETE = async (id) => {
    let result = await models.Remove(id)
    return result
}