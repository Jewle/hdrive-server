const model = require('mongoose').model
const Schema = require('mongoose').Schema
const UserSchema = new Schema({
    email:{
        required:true,
        type:String
},
    name:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    filesToWatch:[
        {type:Schema.Types.ObjectId,
        ref:'file'}
    ]
})

module.exports = model('user', UserSchema)
