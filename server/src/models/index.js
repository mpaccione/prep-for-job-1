import Joi from "joi"

const issueSchema = Joi.object({
    // TODO: define schema
})

const issueValidator = async (postObj) => {
    try {
        return await issueSchema.validateAsync(postObj)
    } catch (err) {
        console.error(err)
    }
}

export default issueValidator  