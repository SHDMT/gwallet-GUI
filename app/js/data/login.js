/*
    用户登陆传输的数据
 */
const {
    ipcRenderer
} = require('electron');
const gwallet_cli = require('../../../exe/js/gwallet-cli');
const gwallet = require('../../../exe/js/gwallet');
const gravity = require('../../../exe/js/gravity');
const command = require('../../../exe/js/command');
const gravity_cli = require('../../../exe/js/gravity-cli');
const responseData = require('../../../util/responseData');

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