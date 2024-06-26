const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let followingSchema=new Schema({
    username:{
        type:String,
        unique:true
    }
})
module.exports = mongoose.model('Following', followingSchema);