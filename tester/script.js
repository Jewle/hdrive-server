// let rawJson = []
// let childrenList = []
// let folders = []
// let mappedFolders = []
//
// fetchFiles()
// //fix this fucking shit. I guess i did it
// document.querySelector('.directory-list').addEventListener('click', (e)=>{
//     const target = e.target
//     if(!target.classList.contains('folder')) return
//     target.innerHTML+= `<ul>
//                             ${childrenList.find(f=>f._id === target.dataset.id).children.map(f=>{
//                                 return `<li data-id='${f._id}' class="folder">${f.name}</li>`
//     })}
//                         </ul>`
//
//
// })
//
//
//
//
// function setChildrenList(data) {
//     const result = []
//     for(let i = 0; i<data.length;i++){
//         result.push({_id:data[i]._id,children:[]})
//         for(let j = 1; j<data.length;j++){
//               if(data[j].parentFolder === data[i]._id){
//                  result[i].children.push(data[j])
//               }
//         }
//     }
//     return result
// }
//
// function renderHTML(data){
//
//
//     document.querySelector('.directory-list').innerHTML = templateTree(data)
// }
//
// function templateTree(data) {
//        let result = ''
//         if(!data?.length){
//             return `<li class="folder">${data.name}</li>`
//         }
//        for (let i = 0; i<data.length;i++){
//             if (data[i]?.children?.length!==0){
//
//                 result+=`<li data-id="${data[i]._id}" class="folder">${data[i].name}<ul>${templateTree(data[i].children)}</ul></li>`
//             }
//             else{
//
//                 result+=`<li data-id="${data[i]._id}" class="folder">${data[i].name}</li>`
//             }
//        }
//        return result;
//
// }
//
// function tree(json) {
//     json = json.map(f=>{f.children=null; return f})
//         var map = {}, node, roots = [], i;
//
//         for (i = 0; i < json.length; i += 1) {
//             map[json[i]._id] = i; // initialize the map
//             json[i].children = []; // initialize the children
//         }
//
//         for (i = 0; i < json.length; i += 1) {
//             node = json[i];
//             if (node.parentFolder) {
//                 // if you have dangling branches check that map[node.parentId] exists
//                 json[map[node.parentFolder]].children.push(node);
//             } else {
//                 roots.push(node);
//             }
//         }
//         return roots;
//
//
// }
//
// async function fetchFiles() {
//     const response = await fetch('http://localhost:5000/api/main/getfolders')
//     const json = await response.json()
//     rawJson = [...json]
//     childrenList = setChildrenList(rawJson)
//     folders = tree(json)
//
//
//     mappedFolders = folders.map(f=>{
//         return {name:f.name, _id:f._id, children:[]}
//     })
//
//     renderHTML(mappedFolders)
// }

upload.onchange = function(){
    const formData = new FormData()
    formData.append('file', this.files[0])

    fetch('http://localhost:5000/api/main/upload', {
        method:'POST',
        headers:{
        },
        body:formData
    })

}
const folders = [{"_id":"60ffc2f697d6fe033838ede5","name":"audio","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"60ffc48d0e37b41578271531","name":"2021","parentFolder":"60ffc2f697d6fe033838ede5","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"60ffc4d30e37b41578271533","name":"pics","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"60ffc54e0e37b41578271535","name":"good","parentFolder":"60ffc4d30e37b41578271533","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"60ffc57a0e37b41578271537","name":"supergood","parentFolder":"60ffc54e0e37b41578271535","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"60ffc5a70e37b41578271539","name":"other","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6105a0cddc653a142017f02d","name":"xxx","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6105a66c6d8cd517c47ec817","name":"maneskin","parentFolder":"60ffc2f697d6fe033838ede5","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6105a67f6d8cd517c47ec81b","name":"eurovision","parentFolder":"6105a66c6d8cd517c47ec817","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6105a68f6d8cd517c47ec81d","name":"lover","parentFolder":"60ffc4d30e37b41578271533","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6105a6956d8cd517c47ec81f","name":"cunt","parentFolder":"6105a0cddc653a142017f02d","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6105a6ce6d8cd517c47ec826","name":"docs","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6105a6da6d8cd517c47ec829","name":"important","parentFolder":"6105a6ce6d8cd517c47ec826","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106dd3630321d1ac45d25b5","name":"morgenshtern","parentFolder":"60ffc2f697d6fe033838ede5","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f0d4724ff90f7480c2ed","name":"games","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f0fb724ff90f7480c2f2","name":"death","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f121724ff90f7480c2fa","name":"xmcd","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f19b724ff90f7480c2ff","name":"remove","parentFolder":"6106f121724ff90f7480c2fa","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f1a5724ff90f7480c302","name":"as","parentFolder":"6106f19b724ff90f7480c2ff","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f1ac724ff90f7480c305","name":"soon","parentFolder":"6106f1a5724ff90f7480c302","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f1b3724ff90f7480c307","name":"possible","parentFolder":"6106f19b724ff90f7480c2ff","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f1d4724ff90f7480c30e","name":"tits","parentFolder":"6105a6956d8cd517c47ec81f","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f2b9724ff90f7480c319","name":"fast","parentFolder":"6106f121724ff90f7480c2fa","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f376724ff90f7480c327","name":"superfast","parentFolder":"6106f121724ff90f7480c2fa","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f3b9724ff90f7480c331","name":"lalal","parentFolder":"6106f121724ff90f7480c2fa","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f3fb724ff90f7480c33a","name":"hui","parentFolder":"6106f121724ff90f7480c2fa","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f40b724ff90f7480c33d","name":"fuck","parentFolder":"6106f121724ff90f7480c2fa","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f476724ff90f7480c347","name":"yul","parentFolder":"6106f121724ff90f7480c2fa","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f499724ff90f7480c353","name":"ggg","parentFolder":"6106f121724ff90f7480c2fa","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6106f4a0724ff90f7480c356","name":"lllo","parentFolder":"6106f121724ff90f7480c2fa","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"611ee80a7b73501628ebd804","name":"girl","parentFolder":"60ffc4d30e37b41578271533","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"611ee8207b73501628ebd80c","name":"action","parentFolder":"6106f0d4724ff90f7480c2ed","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"611ee8337b73501628ebd80e","name":"execution day","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"612189e2b4546e0d747cce82","name":"exe","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6162a2c988063f109422cefc","name":"slaughter to prevail","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6162fe7088063f109422cf3f","name":"more files","parentFolder":"6106f121724ff90f7480c2fa","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"61660986fe2fbf15f4b31248","name":"kostolom","parentFolder":"6162a2c988063f109422cefc","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"6166099bfe2fbf15f4b31251","name":"bleed from within","__v":0,"userId":"613d3a541693880844cd1479"},{"_id":"616c7c323b9f3a14484aefbf","name":"you are dead","parentFolder":"6106f0fb724ff90f7480c2f2","__v":0,"userId":"613d3a541693880844cd1479"}]
