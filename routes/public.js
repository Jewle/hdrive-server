const Router = require('express').Router
const router = new Router()
const File= require('../models/File')
const path = require('path')
router.get('/download/:id', async (req,res)=>{
    const {id} = req.params
    const file = await File.findById(id)
    if(!file){
        res.status(404).json({msg:'File is not found'})
        return
    }
    const {_id:userId} = req.user
    console.log({id,userId,file})

    const canDownload = file.canDownload.includes(userId)
    const isPublic = file.isPublic
    const isOwner = file.userId.toString() === userId.toString()

    if (canDownload || isPublic || isOwner) {
        const url = path.resolve(file.urlUnencoded)
        res.json({msg:'ok'})
    }else {
        return res.status(401).json({msg:'You cannot download this file'})
    }





})

router.get('/test', (req,res)=>{
    res.json({
        status:'working!'
    })
})

module.exports = router
