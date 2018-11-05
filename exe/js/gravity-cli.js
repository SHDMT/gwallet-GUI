let path = require('path');
let exec = require('child_process').exec;
let format=require('../../util/format');


let getPeers = () => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli getpeerinfo';
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result=stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0];
                    resolve(result);
                } catch (err) {
                    console.log("getPeers.err==>", err);
                    reject(err)
                }
            }
        });
    })
};

let getCurrentHeight = () => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli getcurrentheight';
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result=stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0];
                    resolve(result);
                } catch (err) {
                    console.log("getCurrentHeight.err==>", err);
                    reject(err)
                }
            }
        });
    })
};


let getCurrentMCI = () => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli getcurrentmci';
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result=stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    resolve(result);
                } catch (err) {
                    console.log("getCurrentMCI.err==>", err);
                    reject(err)
                }
            }
        });
    })
};


let isCommittee = () => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli iscommittee'
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result=stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    resolve(result);
                } catch (err) {
                    console.log("isCommittee.err==>", err);
                    reject(err)
                }
            }
        });
    })
};

let getMiningSpeed = () => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli getminingspeed';
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    resolve(result);
                } catch (err) {
                    console.log("getMiningSpeed.err==>", err);
                    reject(err)
                }
            }
        });
    })
};


let startMining = (inParm) => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli startmining -n '+inParm.num
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0];
                    resolve(result);
                } catch (err) {
                    console.log("startMining.err==>", err);
                    reject(err)
                }
            }
        });
    })
};


let stopMining = () => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli stopmining';
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    resolve(result);
                } catch (err) {
                    console.log("stopMining.err==>", err);
                    reject(err)
                }
            }
        });
    })
};


let getMCIByUnitHash = () => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli stopmining'
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    resolve(result);
                } catch (err) {
                    console.log("getMCIByUnitHash.err==>", err);
                    reject(err)
                }
            }
        });
    })
};


let getAllContracts = () => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli listallcontractsaddress';
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0];
                    resolve(result);
                } catch (err) {
                    console.log("getAllContracts.err==>", err);
                    reject(err)
                }
            }
        });
    })
};


let getAllContractsByAsset = (inParm) => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli listcontracts -a '+inParm.assetHash;
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0];
                    resolve(result);
                } catch (err) {
                    console.log("getAllContractsByAsset.err==>", err);
                    reject(err)
                }
            }
        });
    })
};


let getContractInfo = (inParm) => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli getcontractinfo -c '+inParm.caddr;
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0];
                    resolve(result);
                } catch (err) {
                    console.log("getContractInfo.err==>", err);
                    reject(err)
                }
            }
        });
    })
};


let progress = () => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli progress';
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0];
                    resolve(result);
                } catch (err) {
                    console.log("getContractInfo.err==>", err);
                    reject(err)
                }
            }
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
    getAllContracts,
    getAllContractsByAsset,
    getContractInfo,
    progress,
};