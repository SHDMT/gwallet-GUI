/*
    用户登陆传输的数据
 */
const {
    ipcRenderer
} = require('electron');

//let args={
//  password,//required
//}
let startWallet = (args) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send('startWallet',args);
        ipcRenderer.once('startWallet', (event, result) => {
        		if (result.errorCode) {
                reject(result.errorMessage);
            } else {
            		resolve(result);
            }
        });
    })
};




module.exports = {
	startWallet,	
}