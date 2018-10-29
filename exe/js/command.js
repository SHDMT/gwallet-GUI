let path = require('path')
let exec = require('child_process').exec;
let command = (inParam) => {
     return new Promise((resolve, reject) => {
    //     let inParamAble;
    //     switch (inParam.split(" ")[0]) {
    //         case 'getnewaddress':
    //         case 'getbalance':
    //         case 'gethistory':
    //         case 'getmessageinfo':
    //         case 'sendtext':
    //         case 'sendpayments':
    //         case 'invokecontract':
    //         case 'issuecontract':
    //         case 'deploycontract':
    //         case 'sendrawunit':
    //         case 'getseed':
    //         case 'validateaddress':
    //         case 'exportprivatekey':
    //         case 'importprivatekey':
    //         case 'createnewaccount':
    //         case 'updatepassword':
    //         case 'rescanwallet':
    //             inParamAble="gwallet-cli "+inParam
    //             break;
    //         case 'startmining':
    //         case 'stopmining':
    //         case 'getlastkeyunit':
    //         case 'gettips':
    //         case 'getkeyunit':
    //         case 'getunits':
    //         case 'getinfo':
    //         case 'isgood':
    //         case 'getunitball':
    //         case 'getball':
    //         case 'isstable':
    //         case 'getunit':
    //         case 'getcommittee':
    //         case 'getcurrentheight':
    //         case 'getcurrentmci':
    //         case 'getblock':
    //         case 'getpeerinfo':
    //         case 'iscommittee':
    //         case 'getminingspeed':
    //         case 'getcontractinfo':
    //         case 'listallcontracts':
    //         case 'getNameOfAssetCmd':
    //         case 'listcontracts':
    //             inParamAble="gravity-cli "+inParam
    //             break;
    //         default:
    //             console.log("输入的命令不存在！")
    //
    //
    //     }


        let exe_parm='../gravity-cli '+inParam;
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    resolve(stdout);
                } catch (err) {
                    console.log("command.err==>", err);
                    reject(err)
                }
            }
        });
    })
}

module.exports = {
    command,
}