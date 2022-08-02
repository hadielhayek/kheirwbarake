const { Schema, model } = require('mongoose')

const user_schema = new Schema({
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    }
},
    { collection: 'users', }
)

module.exports = model('user', user_schema)