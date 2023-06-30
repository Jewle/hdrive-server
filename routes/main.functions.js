
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
    if(type==='observableFile'){
        return data.map(f=>`
            <li 
            data-role="observablefile" 
            data-title='${f.name}' 
            data-fid="${f._id}"
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
        return 'https://lh3.googleusercontent.com/pw/AJFCJaWlBc9JKU7pXm0T9r4rMKa1Q-BM52FYs-ywHjWZjSgLh_YFGMGzmH55ZyCAKEHT-IuauBmuRVepMAFMlQZZLtgt5VrvouSE3jAqgV3N1_DH5zST8id4wQCL-F0uQl8LnnIf3Vm_KCNc3J1dWfudEXjUzeHIWOB2aAMiOpvoJoI5fXKR1KUoMRqukybFnp0aY9fQG94jOiN838vWKl1HaHU-CtTqisZfOjam3lG3lu4Tf688DBo2dxcB8_SSnY-n6Wy_AyCxriTLK0DhKAmqX8NxygoL6XdE72p4TOZTI1a57b-U4FwxFkERqDLBwP704TTZd9OJBSMdM6cFS-VCNQ7Iq2-y_KtbODsFUdASzIHdbSGkBDYn42d6lGPcsdB1pm8l7XH1Djy34c70upVFxL5qsjIyAWVIEXiaFDvB4Fp5DMag1wVXe-MfHbYRGjI4oMOdtzs5IO8_u1muK4sSjtbxM_ybJBcWqVm9sz9rKZnkEOBu_nAHKdCCmzrri6p7qzWyd_jyVzMQKMgrCekFpjEOvQLH-9bfDqQYH1BJe8kGeqRWiSJTwVAu0iS4dqXvgNorLIFAWYH2sSSbvxP1TvfpWIsJyGAwpcwQI3SWzDuJUqMMOKuX7ggfdddSqJn2p5pAk9U7kob4kwGs03QQxujORh2ki6pDiwX9S356SaYEibqjjsXlUvPevMHJBvKsTMjWR0_cXDK01XMrOLJ5TRtxs2kLE_ZOANaK3LA9UcOAwGFlLik7Gb9kyAFRzueEjQ6hUcIBANKjd9lQBz8kbs3tvjzwY3SMd1g4gmzqUQ4xzaae2gsmP3-gTl4rvOKIUQoUrToZjG1g-JBKb23tXOiRJ8MANPAVoXbx6jXgOXLs8QwGJGGVvOae9MN0a0SDKbyvONKt9x4Bxe5VWNVu6w=w657-h657-s-no?authuser=0'
    }
    if(type==='text' || type==='doc' || type==='docx' || type==='x-mathcad-xmcd' ||  type.search('document')!==-1){

       

        return 'https://lh3.googleusercontent.com/pw/AJFCJaXclynZWfwkcHj9HcP9qCzv-kFIKTY-aYOKjFAWmB8Avc_xGnZf_r6Z67c0OCAJWkxlDvRId9gYloW83CPfIKKZDqSEDTQ5_UT_uqN36R8T_JUOniFOF3IatJvP0xSeoqdFplLW9MuCKYa5JxtAdw9dp-tx70dgzuFbspR7Kj1DfFHJyiQIzPQFtY3IdSJEcw0-SNMCm4QNL2fo6bH-oPHb2JjHHKi2RUDSh6UTKOjHUgaCLG4vztJccHYpyywCJlkDpXyO5to5-jinVVrRpPqvg3AUeNh36A1OU6Fhf0_aWqw-7WAi-c7-it84oeRtj3Bm1JKMu_Q2nNnAXgzOmHWjsJF46vd2nknfUt2dRnCn-s2dvOAjszQ-OLriOuT4DHYc3wGt1WENrvkWynlifMMDgdHeH0rBB06QHY1kB1iMzcYRn4Ej2UpDTstIIpTpmif7C94Q0SqxCkDd7yy5UOc1Q6TOWQiGpeocf-rTvyk8xnmw_1fY09-_nBMsC4tqRHo9550x63R5C3fmTmhvfmneRGmXDDyTuI6OKhYKtqjlb3gdoX64t0bdosYXxj7DCzNbVUgCFEeP9bAjHi0u6e2luHLYN0zDMeRjyxot1_kIwqhIs7OQN_xaNYBLHBCdAXO5u33VFOiKrbw15vHWLJnPe5McGkSti9KIUN2Kr1fs8rz_iBqRJXnjg0mPEYYRIo_PbBCnozMhfwW7hcPv7KLo8exNmTrjJGO3oIaXt5Kzl5rMgmcwaAdCKyF7GTDeWeKOhbRthweVY_mEeN4EBdYHqbjSKATIMDIitolLy6gIIiUNGRxN5bwZKt1WYSbH5GsJad1WxeH_yDiZMvwS1s_0MGisofT2lEMvwzlWSshPYrChvWg7cGPjyIXvSKRmTZteJs4MOfGoQ4VZajPa1A=w657-h657-s-no?authuser=0'
    }
    if(type==='x-zip-compressed' || type==='x-rar-compressed'){
        return 'https://lh3.googleusercontent.com/pw/AJFCJaWdyRjBqmmA3frJ_xE-FSn0uaTpY9qaXFVe-alN952fkbUCtUZrn-wcPPh9LxMstqz6eUFGC-MAb9skWsdQnIvAOXh6OPTFnAjakc0UBY6mZ7kJ73g78VXnn-qeEU00-bBRN3YCAvVEmMR2eua0EI1rsFTMGWIu1QvNwtZ8LB-lycS6LABcuvEwzqe1Ko6qiKDGr2s_GsCGGH3x_cxhw9kpZPTgiRC-NOyGUsZeWclwKNRyUeAqnsNGy_LMREX7dZ2IslvLdFQGu7D2echPBi-GVTGYgbG9YCTUEjcgPzqyG9FrRiFQAnBBuNuWCTxez62arz647KZPn5Szaq_FcuIJgh59vpDLcakKpBGwuPTCySD_RhXYWU4y3MWcaQk-iOZG2tlKTqHyZnDANgHss1JP05JHaUvzdLk2mtY798H1zlgnTefKy15wCikNMGpgaI4eLrWQA_09ua12APrzdW2VdfLGKFCnqHrlmN6wYGwKDFM0jos86dgU0OUOJ5dTSosOpngT-dhVvVtC57rCdzhweNzfUG9sJDYZJUH2o8tMUFDlILW-LmYK0YzKSAiYvAJj20GSOvZRyKsxbgPw3QRBdfW7maTTc4A9P7kX_PCnlL91-dy2MBXvmhVj2DXbevGJ4gM8wC84SUPAB1DNUHeecDdXRdP40s--WWN6qWQ-j9wvpmlsqHzXAl6OfRyKf4sKzoe-zhtlxOqc5OHS_eZGmKGIFc79mlgPN_9LP4X7im-4HoYPCA1SRtNz1-tkSmTz_iv1ValRkaA0NcYrkbRDI9HB5fHfi0PYRSc9P1LhGdsqqQYev_32DqKRsgQEW4vz_xNX2o-xI67TuiW7YlXZ7L5TS_AiQM1IWmtZ-X-u9jTqQSivpqU-LaPOaB5vZtRdGIy3Kww1PAuVWwPJmg=w657-h657-s-no?authuser=0'
    }
    return 'https://lh3.googleusercontent.com/pw/AJFCJaVABIuUAXgd8Tvki-FCqS2aVmfSTCosdU-sfIEyCjfY6YlGij8x8PlNTezTL1trxkIiXCkH2oL6E1Gvk6k8kHDNt6xsxbIPs53YDFmKKuX5kWdC0roYjeJR69gBu7MNAOVm8yJGF8D5Hz1qdETMPd3nMNMv_p94irk-wbfz1vFL7yXC59PKf1xg4UaU5GCAufCEikyGXufa8AYqw2EYJmf9PaGBt5aZZxc-oo11kHWKKAxrrFc43iO80RYT7fr6DlJh1YBybp0pP7wIzQgKNvS4bNQVUXFtWO2XlnJYwFh7s9AijoYE13TO5zXGl90ay_nB84NnIMpEiPFka4-g65Fcud4okzzLSfH37LHJhUK-BrPYx2bFUIYTYanXKZVONLJghwWJ45V3vEY98ty7JmL6r6CW7BLw9bffgYnQSZl0EDMQ3tUfZN54o9hVOJjoyuFMRq1aFh2XOjMmdblpWsUs1QehEbv_rFPO0EyNt-kcHtN3sWWoKAiqFkRkGQbPpGNTjvM2y_kmDYXcKp2_86LCIJI9mxJaNwMTzHk60ByOIckKvxoWi_qF2hYqMvHKidM0CAJZupmk3jMun3nXPc3BkPuN1BAIJITVznztiO9NsWblqmwbRkMJm38yQB0q43d83S6oeFhPx3c8qRudxHGURf7UkcUVdkHJBgoPELQngBOla4498t1LEjAjIccHeK_KR64W0askAfRaSFhbTrylKRfVVFFb9ldEuxw6AZIJZW3LmPM5Hr1ESEZs4OI9Lqfs2BAD1zNhbnjnYHYxuFOLMA6FEsLiXSwofrlRc47Yq1k6HHnhyhQEZZ87xw1S6DO-bPVoknrS7bbIj8wbr2Zzb-RtkFukRvZULr0rjy7-NUTKf5oPV3y9XHLkfigfgasxO36svDf29_qi16RVJg=w876-h657-s-no?authuser=0'
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

function generateObservableFolder(files){

    return `<li  data-role="observableFolder" class="folder observable-folder">
                Observable Folder
                <ul>
                   ${mapHtml(files,'observableFile')}
                </ul>
            </li>
    `
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



module.exports ={ mapHtml, createPlaceholder, deleteFiles, computeFolderSize, sizeHandler,generateObservableFolder}
