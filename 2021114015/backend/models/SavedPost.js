const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let savedSchema = new Schema({
    user: {
        type: String
    },
    postid:{
        type:String
    },
    posted_by: {
        type: String
    },
    posted_in: {
        type: String,
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
    },
})
module.exports = mongoose.model('Saved', savedSchema);

