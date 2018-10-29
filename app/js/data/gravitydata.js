/*
    获取块上信息
 */

const {
    ipcRenderer
} = require('electron');
const gravity = require('../../../exe/js/gravity');
const gravity_cli = require('../../../exe/js/gravity-cli');
const responseData = require('../../../util/responseData');
//获取peer数量 网络
let getPeers = () => {
    return new Promise((resolve, reject) => {
        gravity_cli.getPeers()
            .then((res) => {
                resolve(responseData.setResponse({
                    _data: res
                }))
            })
            .catch(err => {
                reject(responseData.setResponse({
                    _errorCode: 99,
                    _errorMessage: err
                }))
            });
    })
};

//获取最新区块高度
let getCurrentHeight = () => {
    return new Promise((resolve, reject) => {
        gravity_cli.getCurrentHeight()
            .then((res) => {
                resolve(responseData.setResponse({
                    _data: res
                }))
            })
            .catch(err => {
                reject(responseData.setResponse({
                    _errorCode: 99,
                    _errorMessage: err
                }))
            });
    })
};


//获取最新main chain index
let getCurrentMCI = () => {
    return new Promise((resolve, reject) => {
        gravity_cli.getCurrentMCI()
            .then((res) => {
                resolve(responseData.setResponse({
                    _data: res
                }))
            })
            .catch(err => {
                reject(responseData.setResponse({
                    _errorCode: 99,
                    _errorMessage: err
                }))
            });
    })
};


//判断是否是委员会成员
let isCommittee = () => {
    return new Promise((resolve, reject) => {
        gravity_cli.isCommittee()
            .then((res) => {
                resolve(responseData.setResponse({
                    _data: res
                }))
            })
            .catch(err => {
                reject(responseData.setResponse({
                    _errorCode: 99,
                    _errorMessage: err
                }))
            });
    })
};

//获取挖矿速度
let getMiningSpeed = () => {
    return new Promise((resolve, reject) => {
        gravity_cli.getMiningSpeed()
            .then((res) => {
                resolve(responseData.setResponse({
                    _data: res
                }))
            })
            .catch(err => {
                reject(responseData.setResponse({
                    _errorCode: 99,
                    _errorMessage: err
                }))
            });
    })
};


//启动挖矿
//args={
//  num:1,//启动挖矿数量
//}
let startMining = (args) => {
    return new Promise((resolve, reject) => {
        gravity_cli.startMining(args)
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

//关闭挖矿
let stopMining = () => {
    return new Promise((resolve, reject) => {
        gravity_cli.stopMining()
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

//根据unitHash查Mci
// var args={
//     unitHash,
// }
let getMCIByUnitHash = (args) => {
    return new Promise((resolve, reject) => {
        gravity_cli.getMCIByUnitHash(args)
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


//查询所有的智能合约的地址和智能合约名
let getAllContracts = (args) => {
    return new Promise((resolve, reject) => {
        gravity_cli.getAllContracts(args)
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

//根据资产名查询所能运行的合约名
//var args={
//     assetHash:xxxxxxxxxxxxxxx,
// }
let getAllContractsByAsset = (args) => {
    return new Promise((resolve, reject) => {
        gravity_cli.getAllContractsByAsset(args)
            .then(res => {
                resolve(responseData.setResponse({
                        _data: res
                    }))
                })
            .catch(err => {
                reject(responseData.setResponse({
                    _errorCode: 99,
                    _errorMessage: err
                }))
            })
    })
};

//根据合约名查询合约详情（合约说明，参数说明，合约参数）
//var args={
//     caddr:xxxxxxxxxxxxxxx,
// }
let getContractInfo = (args) => {
    return new Promise((resolve, reject) => {
        gravity_cli.getContractInfo(args)
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

//启动Gravity
let startGravity = () => {
    return new Promise((resolve, reject) => {
        gravity.startGravity()
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

//根据(当前block高度/最新高度*0.3+当前mci/最新mci*0.7)*10^7
let progress = () => {
    return new Promise((resolve, reject) => {
        gravity_cli.progress()
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
   getPeers,
   getCurrentHeight,
   getCurrentMCI,
   isCommittee,
   getMiningSpeed,
   startMining,
   stopMining,
   getMCIByUnitHash,
   startGravity,
   getAllContractsByAsset,
   getContractInfo,
   getAllContracts,
   progress,
};


