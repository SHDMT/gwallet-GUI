/*
    注册阶段的数据
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

//获取种子
//不需要传参
let getSeed = () => {
    return new Promise((resolve, reject) => {
        gwallet.getSeed()
            .then((res) => {
                resolve(responseData.setResponse({
                    _data: res
                }));
            })
            .catch(err => {
                reject(responseData.setResponse({
                    _errorCode: 99,
                    _errorMessage: err
                }));
            });
    })
};

//验证种子
// var args={
//    inputSeed,//required
// }
let validateSeed = (args) => {
    return new Promise((resolve, reject) => {
        gwallet.validateSeed(args)
            .then((res) => {
                resolve(responseData.setResponse({
                    _data: res
                }));
            })
            .catch(err => {
                reject(responseData.setResponse({
                    _errorCode: 99,
                    _errorMessage: err
                }));
            });
    })
};

//恢复钱包，创建钱包和恢复钱包均执行此命令，设置完密码后执行
//var args={
//  password,//用户确认的密码,required
//  inputseed,//上面输入的种子或已经确认的种子,required
//}
let recoverWallet = (args) => {
    return new Promise((resolve, reject) => {
        gwallet.recoverWallet(args)
            .then((res) => {
                resolve(responseData.setResponse({
                    _data: res
                }));
            })
            .catch(err => {
                reject(responseData.setResponse({
                    _errorCode: 99,
                    _errorMessage: err
                }));
            });
    })
};


module.exports = {
    getSeed,
    validateSeed,
    recoverWallet,
}
