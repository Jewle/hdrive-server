const Router = require('express').Router
const fileUpload = require('../middleware/upload')
const router = new Router()
const File= require('../models/File')
const upload =  fileUpload.single('file')
const path = require('path')
const fs = require('fs')
const Folder = require('../models/Folder')
const {mapHtml, createPlaceholder, deleteFiles, computeFolderSize, sizeHandler} = require('./main.functions')
const User= require('../models/User')
const WordExtractor = require("word-extractor");
const extractor = new WordExtractor();
const textToImage = require('text-to-image');

router.post('/upload', upload, async (req,res)=>{

            const file = new File()
            const userId = req.user._id
            const reader =  fs.readFileSync(req.file.path)
            file.fileName = req.file.filename
            file.originalName = req.file.originalname
            file.size = req.file.size
            file.type = req.file.mimetype
            file.uploadedAt = Date.now()
            file.urlUnencoded = req.file.path
            file.isPublic = false
            file.userId=userId
            file.imgSrc = file.type.split('/')[0]==='image' ?   file.urlUnencoded :createPlaceholder(file.type)
            file.authorName = req.user.name

            // console.log(reader.length)
            // res.set('Content-Length', reader.length)

            


           await file.save()
           res.send(reader)
})

router.get('/files', async (req,res)=>{
	const page = req.query.page || 0
	const limit = 6
	const offset = limit*(page-1)


    const id =  req.user._id
    const files = await File.find({userId:id}, 'originalName type urlUnencoded imgSrc').skip(offset).limit(limit)
    // const observableFiles = await User.findById(id,'_id').populate('filesToWatch','originalName type urlUnencoded imgSrc')
    const countDocuments = await File.countDocuments({userId:id})
    const pages = Math.ceil(countDocuments/limit)


    res.json({files,pages})
})
//fix little bit
router.get('/file', async (req,res)=>{
    const {id} = req.query
    const userId =  req.user._id
    const file = await File.findOne({_id:id}).populate('userId','name _id')
    const url = path.resolve(file.urlUnencoded)




    if(file.userId._id.toString()===userId.toString() || file.canDownload.includes(userId) || file.isPublic){
        res.json({...file._doc,isOwner:file.userId._id.toString()===userId.toString()})
        return
    }
    res.status(400).json({msg:'Access denied'})

})

router.get('/preview', async (req,res)=>{
    try{
        const {id} = req.query
        const file = await File.findOne({_id:id}).populate('userId','name _id')
        const url = path.resolve(file.urlUnencoded)
        let dataUri
        const extracted = await extractor.extract(url)
        dataUri = await textToImage.generate(extracted.getBody())
        res.json({uri:dataUri})
   }
   catch (e) {
       res.status(404).json({msg:e})
   }

})

router.post('/searchfiles', async (req,res)=>{
    const userId =  req.user._id
    const {query} = req.body

    const files = await File.find({
        originalName:{$regex:query},
        userId

},'originalName type urlUnencoded imgSrc')
    if (files) {
        return res.json({files})
    }    


})

router.put('/edit', async(req,res)=>{
	const {
		user:{id:userId},
		body:{fileId:_id,newTitle}
	} = req

	const file  = await File.findOne({_id,userId})
	if(!file){
		return res.json({msg:'File not found'})
	}
	file.originalName = newTitle || file.originalName 
	await file.save()
	res.json({msg:'Success'})


})


router.post('/download', async (req,res)=>{
    const id = req.body.id
    const userId =  req.user._id

    const file = await File.findOne({_id:id, userId})
    if(!file) res.status(404).json({msg:'File does not exist'})

    const url = path.resolve(file.urlUnencoded)
    const fileBuffer = fs.readFileSync(path.resolve(file.urlUnencoded))

    res.download(url)
    // res.sendFile(fileBuffer)

    // res.download(url)
})

router.post('/createfolder', async (req,res)=>{
    const folderName = req.body.folderName
    const parentFolder = req.body.parentFolder
    const folder = new Folder()
    const userId =  req.user._id
    folder.name = folderName
    folder.userId = userId
    if(parentFolder){
        folder.parentFolder = parentFolder
    }
    await folder.save()

    res.json({msg:'Folder has been created',id:folder._id})
})

router

router.get('/getfolders', async (req,res)=>{
    const userId =  req.user._id
    let folders = await Folder.find({parentFolder:{
        $exists:false
        },userId})
    let files = await File.find({directory:{$exists:false}, userId})

    // console.log({...folders, computeFolderSize(Folder,)})
    files = mapHtml(files, 'file')
    folders = mapHtml(folders)
    res.json({html:folders+files})
})

//get folders which parentFolder equals  current folder's id
router.get('/getfolderscontent', async (req,res)=>{
    const userId =  req.user._id
    const folderId = req.query.folderid
    const childrenFiles = await File.find({directory:folderId, userId})
    const childrenFolders = await Folder.find({parentFolder:folderId,userId})
    const html = mapHtml(childrenFolders)+mapHtml(childrenFiles,'file')

    res.json({html})
})
//fix
router.put('/movetofolder', async (req,res)=>{
    const userId =  req.user._id
    const fileId=req.body.fileId
    const folderId = req.body.folderId
    const prevFolderId = req.body.previousFolderId
    const prevFolder = prevFolderId!=='0' ? await Folder.findOne({_id:prevFolderId, userId}) : null
    const currentFile = await File.findOne({_id:fileId,userId})



    if (!folderId) {
        delete currentFile.directory
    }
    try{
        await File.findByIdAndUpdate(fileId,{directory:folderId})
        if(prevFolder && prevFolder.size>0){
            await Folder.findOneAndUpdate({_id:prevFolderId,userId}, {$inc:{size:-currentFile.size}})
        }
        await Folder.findOneAndUpdate({_id:folderId,userId}, {$inc:{size:currentFile.size}})
        
    }
    catch(e){
        throw e
    }

    
    
    res.json({msg:'Good', currentFile})
})

router.get('/folderinfo', async(req,res)=>{
	const folder = await Folder.findById(req.query.id)
    const allFolders = await Folder.find({userId:req.user._id})
    const nestedFoldersIds = mega(folder,allFolders)
    nestedFoldersIds.push(folder._id)
    const nestedFiles = await File.find({
        userId:req.user._id,
        directory:{
            $in:nestedFoldersIds
        }
    })
    const computedSize = nestedFiles.map(file=>file.size).reduce((curr,acc)=>curr+=acc,0)

	res.json({files:nestedFiles.length, size:sizeHandler(computedSize)})
})

router.put('/renamefolder', async (req,res)=>{
    const {id, name} = req.body
    const userId = req.user._id
    const update = await Folder.findOneAndUpdate({_id:id,userId},{name})
    if(!update){
        res.status(404).json({msg:'Error'})
        return
    }
    res.json({msg:'Folders name has been successfully changed '})
})
//promise i will make  it later
router.delete('/deletefolder', async (req,res)=>{
    const userId =  req.user._id
    let folders = await Folder.find({userId})

    const currentFolder = folders.find(f=>f._id.toString()===req.body.id)
    folders = mega(currentFolder,folders)
    folders.push(currentFolder._id)

     const deletingFiles = await File.find({directory:{$in:folders}})
     const pathsOfDeletingFiles = deletingFiles.map(file=>path.resolve(file.urlUnencoded))

    await Folder.deleteMany(
        {_id: {
            $in:folders
        }
    })

    deleteFiles(pathsOfDeletingFiles, async (err)=>{
        if (err) throw err

        await File.deleteMany({directory:{$in:folders}})        
                        
    })
   

   	res.json({msg:'Folder deleted'})

})

router.put('/switchpublic', async (req,res)=>{
    const {id} = req.body
    const userId =  req.user._id
    const file = await File.findOne({_id:id, userId})
    if(!file){
        res.status(404).json({msg:'File is not found'})
        return
    }
    file.isPublic = !file.isPublic
    const msg = file.isPublic ? 'Now file is public' : 'Now file is private'
    await file.save()
    res.json({msg, isPublic:file.isPublic})
})
//users who can be added as a viewer of the file
router.get('/users', async(req,res)=>{
    const userId =  req.user._id
    console.log(req.query)
    const fileId = req.query.fileid
    const users = await  User.find({_id:{$ne:userId}, filesToWatch: {$ne:fileId}})
    res.json(users)
})

router.delete('/delete', async (req,res)=>{
    const userId =  req.user._id

   const file = await File.findOne({_id:req.body.id,userId}) 
    const result = await File.deleteOne({_id:req.body.id,userId})

    if(result===0 ){
        res.status(401).json({msg:'File was not found'})
        return
    }
    const url = path.resolve(file.urlUnencoded)
    fs.unlink(url, (err)=>{
        if(err) throw err;
        res.status(200).json({msg:{
        	text:'Deleted',
        	fileName:file.originalName
        }})
    })

})


router.post('/searchviewers', async (req,res)=>{
    const {val,fileId}= req.body

    let users = await User.find({

        email:{$regex:val},
        _id:{$ne:req.user._id}

    }).limit(3)

    users = users.map(user=>{
        const canSee = !!user.filesToWatch.find(f=>f.toString()===fileId)
        return {
            name:user.name,
            email:user.email,
            canSee,
            _id:user._id,

        }
    })
    res.json(users)
})
router.put('/setviewer', async (req,res)=>{
    const {fileId,viewerId} = req.body
    const userId = req.user._id
    const file = await File.findOne({_id:fileId, userId})
    const currentUser = await User.findById(viewerId)
    currentUser.filesToWatch.push(file._id)
    file.canDownload.push(viewerId)
    await file.save()
    await currentUser.save()
    res.json({msg:'Success'})
})
router.post('/removeviewer', async (req,res)=>{
    const {viewerId, fileId} = req.body
    const currentUser = await User.findById(viewerId)
    const currentFile = await File.findById(fileId)
    currentUser.filesToWatch = currentUser.filesToWatch.filter(f=>f.toString()!==fileId)
    currentFile.canDownload = currentFile.canDownload.filter(u=>u.toString()!==currentUser._id.toString())
    if (!currentUser || !currentFile){
        res.status(404).json({msg:'Error'})
        return
    }
    await currentUser.save()
    await currentFile.save()
    res.json({msg:'Ok'})
})
router.get('/getfilestowatch', async (req,res)=>{
    const userId = req.user._id
    const currentUser = await User.findById(userId).populate('filesToWatch','originalName type urlUnencoded imgSrc authorName')
    res.json(currentUser.filesToWatch)
})


router.get('/isauth', async (req,res)=>{
	res.json({msg:'ok',userName:req.user.name})
})

module.exports = router



function mega(currentFolder,folders,result=[]){
    for (let i = 0;i<folders.length;i++){
        if(folders[i].parentFolder && folders[i].parentFolder.toString()===currentFolder._id.toString()){
            result.push(folders[i]._id)
            mega(folders[i],folders,result)
        }
    }
    return result
}
