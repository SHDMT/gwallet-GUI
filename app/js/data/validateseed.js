const {
    ipcRenderer
} = require('electron');
//TODO:用户输入的每个字段用","隔开
let inputSeed="playhouse,phonetic,beehive,enrollment,gazelle,alkali,wallet,inventive,unearth,hazardous,commence,stethoscope,snowslide,politeness,cement,determine,select,liberty,spheroid,paragraph,uproot,warranty,breakup,Jupiter,eyeglass,infancy,stockman,whimsical,Geiger,Pandora,stairway,corrosion,treadmill"

/*
   页面初始化
*/
let init = () => {
    bindSearchEvent()
};

let validateSeed = () => {
    // 与主进程通信 获取基本信息
    return new Promise((resolve, reject) => {
        ipcRenderer.send('validateSeed', inputSeed);
        ipcRenderer.once('validateSeed', (event, result) => {
            resolve(result);
        });
    })
};

//*****
let bindSearchEvent = () => {
    //$("#search").on('click', () => {
        //searchInput =parseInt($('#searchInput').val());
    validateSeed()
            .then(result => {
                    if (result.errorCode) {
                        return Promise.reject(result.errorMessage)
                    } else {
                        console.log('validateSeed result==>', result);
                    }
                }
            );
    //});
};
init();