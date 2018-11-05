const {
    ipcRenderer
} = require('electron');
/*
   页面初始化
*/
let init = () => {
    getSeed()
};

let getSeed = () => {
    // 与主进程通信 获取基本信息
    return new Promise((resolve, reject) => {
        ipcRenderer.send('getSeed');
        ipcRenderer.once('getSeed', (event, result) => {
            console.log("getSeed===>",result.replace("[",""))
            console.log("getSeed===>",result.replace("]",""))
            console.log("getSeed===>",result)
            //console.log("getSeed===>",JSON.parse(result))
            //console.log("getSeed===>",JSON.parse(result.data))
            resolve(result);
        });
    })
};
init();