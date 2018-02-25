/**
 * 
 * validate object
 * @param {object} object 
 */
export const validateObject = (object) => {
    let desObject = { ...object }
    for (let key in object) {
        if (!object[key]) {
            delete desObject[key]
        }
    }
    return desObject
}