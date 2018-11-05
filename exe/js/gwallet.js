let path = require('path')
let exec = require('child_process').exec;
let spawn = require('child_process').spawn;
const config = require('electron-json-config');

let format=require('../../util/format')
let getSeed = () => {
    return new Promise((resolve, reject) => {
        let outParm = '';
        let exe_parm = '../gwallet --generateseed'
        let exe_PATH = path.resolve(__dirname, exe_parm);
        console.log("---------->",exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    console.log("--------stdout-->",stdout);
                    let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    resolve(result);
                } catch (err) {
                    console.log("getSeed.err==>",err);
                    reject(err)
                }
            }
        });
    })
};

let validateSeed = (inParm) => {
    return new Promise((resolve, reject) => {
        let outParm = '';
        let exe_parm = '../gwallet --validateseed='+inParm.inputSeed ;
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result=stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    resolve(result);
                } catch (err) {
                    console.log("validateSeed.err==>",err);
                    reject(err)
                }
            }
        });
    })
}

let recoverWallet = (inParm) => {
    return new Promise((resolve, reject) => {
        let outParm = '';
        let exe_parm = '../gwallet --create --pass='+inParm.password+' --seed='+inParm.inputSeed;
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result=stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    resolve(result);
                } catch (err) {
                    console.log("recoverWallet.err==>",err);
                    reject(err)
                }
            }
        });
    })
};

let startWallet = (inParm) => {
    return new Promise((resolve, reject) => {
        let outParm = '';
        let exe_parm = '../gwallet --pass='+inParm.password;
        let exe_PATH = path.resolve(__dirname, exe_parm);
        let startWalletResult=spawn(exe_PATH,{shell:true});
        startWalletResult.stdout.on('data', (data) => {
            console.log(`gwallet启动成功: ${data}`);
//          if (data.indexOf("<<<<<<<result=======")!==-1){
//              console.log("data.toString",data.toString())
//              let result=data.toString().split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0];
//              resolve(data);
//          }
              resolve(data);
        });
        // startWalletResult.stderr.on('data', (data) => {
        //     console.log(`gwallet start error: ${data}`);
        //     reject(data);
        // });
        config.set('startWalletPid',startWalletResult.pid)
    })
}
module.exports = {
    getSeed,
    validateSeed,
    recoverWallet,
    startWallet,
}