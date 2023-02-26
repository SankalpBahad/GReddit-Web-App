const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let subgSchema = new Schema({
    creator: {
        type: String,
        required: true
    },
    followers: {
        type: Number
    },
    posts: {
        type: Number
    },
    subgrdname: {
        type: String,
        required: true
    },
    subgrddesc: {
        type: String,
        required: true
    },
    tags:{
        type:String
    },
    bannedkeys: {
        type: String,
        required: true
    },
    blocked: {
        type: Array
    },
    nonblocked: {
        type: Array
    },
    left:{
        type:Array
    },
    joinreqs: {
        type: Array
    }
})
module.exports = mongoose.model('Subg', subgSchema);

