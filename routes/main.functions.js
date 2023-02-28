
// const WordExtractor = require("word-extractor");
// const extractor = new WordExtractor();
// const textToImage = require('text-to-image');

function mapHtml(data,type='folder'){
    if(type==='folder'){
        return data.map(f=>`
        	<li data-role="folder" 
        	data-title='${f.name}' 
        	ondragover="event.preventDefault()" 
        	data-fid="${f._id}"
            data-size="${sizeHandler(f.size)}" 
        	class="folder 
        	droppable">
       ${f.name}
        </li>
        
`).join('')
    }
    if(type==='file'){
        return data.map(f=>`
        	<li draggable="true" 
        	data-role="file" 
        	data-title='${f.name}' 
        	data-fid="${f._id}"
        	data-folderId="${f.directory || 0}"
        	>
        		${f.originalName}
        	</li>`)
        .join('')
    }
} 

function optionsHTML(dirs,fileDir){
    let array = []
    dirs = dirs.filter(dId!==fileDir._id)
    for (let i=0;i<dirs.length;i++){

    }

}
function _Tab(count){
    return new Array(count).fill('-').join('')
}
function createPlaceholder(type, fileBuffer=null){
    type = type.split('/')[0]
    if(type==='audio'){
        return 'files/placeholders/audio.png'
    }
    if(type==='text' || type==='doc' || type==='docx' || type==='x-mathcad-xmcd' ||  type.search('document')!==-1){

       

        return 'files/placeholders/doc.png'
    }
    if(type==='x-zip-compressed' || type==='x-rar-compressed'){
        return 'files/placeholders/arc.png'
    }
    return 'files/placeholders/default.png'
}


var fs = require('fs');

function deleteFiles(files, callback){
  var i = files.length;
  files.forEach(function(filepath){
    fs.unlink(filepath, function(err) {
      i--;
      if (err) {
        callback(err);
        return;
      } else if (i <= 0) {
        callback(null);
      }
    });
  });
}

function sizeHandler(bytes,decimals=2) {

        let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

        let i = 0

        for (i; bytes > 1024; i++) {
            bytes /= 1024;
        }

        return parseFloat(bytes.toFixed(decimals)) + ' ' + units[i]

}


async function computeFolderSize(Folder,File,folderId,userId){
    const folder = await Folder.findById(folderId)
    const allFolders = await Folder.find({userId})
    const nestedFoldersIds = mega(folder,allFolders)
    nestedFoldersIds.push(folder._id)
    const nestedFiles = await File.find({
        userId,
        directory:{
            $in:nestedFoldersIds
        }
    })
    const computedSize = nestedFiles.map(file=>file.size).reduce((curr,acc)=>curr+=acc,0)

    return sizeHandler(computedSize)
}



module.exports ={ mapHtml, createPlaceholder, deleteFiles, computeFolderSize, sizeHandler}
