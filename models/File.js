const mongoose = require('mongoose')
const Schema= mongoose.Schema
const User = require('./User')
const FileSchema = new Schema({
    fileName:{
        type:String,
        required:true
    },
    originalName:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    urlUnencoded:{
        type:String,
        required:true
    },
    uploadedAt:{
        type:Number,
        required:true
    },
    isPublic:{
      default:false,
      type:Boolean
    },
    directory:{
        type:Schema.Types.ObjectId,
        ref:'folder'
    },
    imgSrc:{
        type:String,
        default:null
    },
    userId:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },
    canDownload:[
        {
            type:Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    authorName:{
        default:'user',
        type:String
    }
})

FileSchema.post('deleteOne', async function () {
    const docId = this._conditions._id

    const users = await User.find(
        {

        filesToWatch:{$in:[docId]},
        // _id:{$ne:this._conditions.userId}

        })


    if (users){
        users.forEach(user=>{
            user.filesToWatch = user.filesToWatch.filter(fileId=>fileId.toString()!==docId.toString())
        })

        await User.bulkSave(users)
    }

})

module.exports= mongoose.model('file', FileSchema)
