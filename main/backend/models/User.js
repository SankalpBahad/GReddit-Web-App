const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
let userSchema = new Schema({
   first_name: {
      type: String,
      required: true
   },
   last_name: {
      type: String,
      required: true
   },
   user_name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique:true
   },
   contactnumber: {
      type: Number,
      required: true
   },
   age: {
      type: Number,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   followers: {
      type: Array
   },
   following: {
      type: Array
   }
})
// userSchema.methods.checkPassword=function(password){
//    return bcrypt.compare(password,this.password)
// }

// userSchema.methods.generateToken=function(){
//    const payload={user:{id:this._id}}
//    const secret="abc123"
//    const token=jwt.sign(payload,secret,{expiresIn: "30d" })
// }
module.exports = mongoose.model('User', userSchema);