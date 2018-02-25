import * as models from '../../models/like'
import { validateObject } from '../../utils/validate'

export const GET = ({ limit, page }) => {
    return models.Get(limit, page)
}

export const INSERT = async (body) => {
    let updateValue = {
        post_id,
        user_id,
        album_media,
    } = body
    let filterUpdate = validateObject(updateValue)

    let result = await models.Insert(updateValue)
    return result
}

export const DELETE = async (id) => {
    let result = await models.Remove(id)
    return result
}