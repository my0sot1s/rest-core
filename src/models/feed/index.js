import mongoose from 'mongoose'

const Schemas = mongoose.Schema({
    comsumer_id: {
        type: String
    },
    post_id: {
        type: mongoose.SchemaTypes.ObjectId
    },
    created: {
        type: Number,
        default: Date.now()
    }
})

const Model = mongoose.model('Feed', Schemas, 'social_timeline')

export const Get = async (limit = 100, page = 1) => {
    const data = await Model
        .find()
        .sort({ created: -1 })
        .skip(limit * (page - 1))
        .limit(limit)
    return data
}

export const Insert = async (InsertObject) => {
    let result = await new Model(InsertObject).save()
    return result
}


export const Update = async (id, UpdateInfo) => {
    return await Model.findByIdAndUpdate({ _id: id }, {
        $set: UpdateInfo
    })
}

export const Remove = async (id) => {
    return await Model.findByIdAndRemove(id)
}


export default Model
