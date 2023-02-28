const mongoose = require('mongoose')
const Schema= mongoose.Schema

const FolderSchema = new Schema({
    name:{
        type:String,
        required:true
    },

    parentFolder:{
        type:Schema.Types.ObjectId,
        ref:'folder',
        required:false
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    size:{
    	type:Number,
    	default:0
    }

})

module.exports = mongoose.model('folder', FolderSchema)
