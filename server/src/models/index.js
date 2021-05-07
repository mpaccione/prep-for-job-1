import Joi from "joi"

const issueSchema = Joi.object({
    createdDate: Joi.date().iso(),
    title: Joi.string(),
    description: Joi.string(),
    severity: Joi.number().positive()
})

export const issueValidator = async (postObj) => {
    try {
        return await issueSchema.validateAsync(postObj)
    } catch (err) {
        console.error(err)
        return false
    }
}