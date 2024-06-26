const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let postSchema = new Schema({
    poster: {
        type: String
    },
    subgrdid: {
        type: String
    },
    subgrdname: {
        type: String
    },
    posttext: {
        type: String
    },
    upvotes: {
        type: Number
    },
    downvotes: {
        type: Number
    },
    comments: {
        type: Array
    }
})

module.exports = mongoose.model('Post', postSchema);
