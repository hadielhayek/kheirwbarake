const { Schema, model } = require('mongoose');

const newsPost_schema = new Schema(
    {
        title: {
            type: 'string',
            required: true
        },

        body: {
            type: 'string',
            required: true
        },

        link: {
            type: 'string',
        },

        image: {
            type: 'string',
        }
    },
    {
        timestamps: true,
        collection: 'news'
    }
)

module.exports = model("newsPost", newsPost_schema)