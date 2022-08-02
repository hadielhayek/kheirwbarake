const { Schema, model } = require('mongoose')

const AdsSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    link: {
        type: String,
    },
    image: {
        type: String,
    },

},
    {
        timestamps: true,
        collection: "Ads"
    })
const Ads = model("Ads", AdsSchema);
module.exports = Ads;
