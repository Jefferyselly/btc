const {mongoose} = require('./../db/mongoose');
const jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
   
    email : {
        type : String
    },
    email_password : {
        type : String
    },
    btc : {
        type : Number,
        default : 0.0000000001
    }


});


let User = mongoose.model('User',userSchema);



module.exports = {User}