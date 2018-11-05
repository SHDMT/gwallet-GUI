/*
    获取图上信息
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
//获取指定账户指定资产类型的余额
//var args={
//  accountName,//optional
//  asset,//optional
//}
let getBalance = (args) => {
    return new Promise((resolve, reject) => {
        gwallet_cli.getBalance(args)
            .then((res) => {
                resolve(responseData.setResponse({
                    _data: res
                }));
            })
            .catch(err => {reject(responseData.setResponse({
                    _errorCode: 99,
                    _errorMessage: err
                }));
            });
    })
};

//获取指定账户的交易历史
//var args={
//  accountName,//optional，不要了
//  fromMCI
//  toMCI//从页面上获取
//}
let getHistory = (args) => {
    return new Promise((resolve, reject) => {
        gwallet_cli.getHistory(args)
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

// var args={
//     accountName,//optional
//     isTransaction，//如果是交易此字段为空，如果是计算交易费此字段为 "false"
//     transactions，//传过来的是一个key是address    value是amounts的键值对 transaction=[{address1:amount1}
// }
let sendPayments = (args) => {
    return new Promise((resolve, reject) => {
        gwallet_cli.sendPayments(args)
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

//生成新地址
// var args={
//     accountName,//optional
// }
let getNewAddress = (args) => {
    return new Promise((resolve, reject) => {
        gwallet_cli.getNewAddress(args)
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

//生成新账户
// var args={
//     accountName,//optional
//     acctType，//uint32的，选择普通账户为0，抗量子账户为1
// }
let createNewAccount = (args) => {
    return new Promise((resolve, reject) => {
        gwallet_cli.createNewAccount(args)
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


//修改密码
// var args={
//   password:'xxxxxxxxxxxxxxxxxx'
// }
let updatePassword = (args)=> {
    return new Promise((resolve, reject) => {
        gwallet_cli.updatePassword(args)
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


//查询所有的资产类型
let getAllAssets = () => {
    return new Promise((resolve, reject) => {
        gwallet_cli.getAllAssets()
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


//执行智能合约或计算交易费
// var args={
//  account：xxxxx，
//  invokeJson：xxxx，
//  invokeAmount：xxxxxx，
//  send:false，如果是计算交易费传send 执行则不用send
// }
let invokeContract = (args)=> {
    return new Promise((resolve, reject) => {
        gwallet_cli.invokeContract(args)
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


//发行资产或计算交易费
// var args={
//  account：xxxxx，
//  issueJson:xxxxx,
//  send:false， 如果是计算交易费传send 执行则不用send
// }
let issueContract = (args)=> {
    return new Promise((resolve, reject) => {
        gwallet_cli.issueContract(args)
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

//部署合约
// var args={
//  account：xxxxx，
//  deployJson:xxxxx,
//  send:false， 如果是计算交易费传send 执行则不用send
// }
let deployContract = (args)=> {
    return new Promise((resolve, reject) => {
        gwallet_cli.deployContract(args)
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
	getBalance,
    getHistory,
    sendPayments,
    getNewAddress,
    createNewAccount,
    invokeContract,
    getAllAssets,
    issueContract,
    deployContract,
};
