const multer = require('multer')
// const allowedTypes = ['image/jpg','image/png','image/bmp','image/jpeg']
//все описано в доках
const storage = multer.diskStorage({
    destination: function (req, file, cb) {//где и как хранить загружаемые файлы
        cb(null, 'files')
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now()+file.originalname)
    }
})
const filefilter =(req,file,cb)=>{
    if( file.size < 500*1024*1024){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}//фильтруем заргужаемые файлы


module.exports = multer({
    storage,
    filefilter
})
