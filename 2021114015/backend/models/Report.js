const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let reportSchema = new Schema({
    subgid: {
        type: String
    },
    postid: {
        type: String
    },
    posttext: {
        type: String
    },
    reported_by: {
        type: String
    },
    reported_user: {
        type: String
    },
    concern: {
        type: String
    },
    visibility:{
        type: Boolean
    }
})

module.exports = mongoose.model('Report', reportSchema);

