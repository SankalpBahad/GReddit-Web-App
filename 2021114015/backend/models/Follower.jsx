const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let followerSchema=new Schema({
    username:{
        type:String,
        unique:true
    }
})
module.exports = mongoose.model('Followers', followerSchema);
