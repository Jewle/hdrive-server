const Router = require('express').Router
const path = require('path')
const File= require('../models/File')
const router = new Router()
const jwt = require('jsonwebtoken')

router.get('/single', async (req,res)=>{
    const {id:fileId,token} = req.query


    const {id:currentUserId} = jwt.decode(token)
     
 
    const {canDownload,userId,urlUnencoded,isPublic} = await File.findById(fileId)
   

    
    
    if (userId.toString()===currentUserId.toString() || canDownload.includes(currentUserId) || isPublic ){
        return res.download(path.resolve(urlUnencoded))

    }

    res.status(404).json({msg:'File not found'})


})

module.exports = router
