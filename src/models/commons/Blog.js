
import mongoose from 'mongoose'
// import data from '../../data.json'

const Schemas = mongoose.Schema({
    link: { type: String },
    tag: { type: String },
    title: { type: String },
    dateCreate: { type: Date, default: Date.now() },
    content: { type: String }
})

const Model = mongoose.model('Blog', Schemas, 'Blog')

export const Get = async (limit = 100, page = 1) => {
    const data = await Model
        .find()
        .sort({ dateCreate: -1 })
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