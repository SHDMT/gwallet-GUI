let path = require('path')
let exec = require('child_process').exec;
let format=require('../../util/format')

let getBalance = (inParm) => {
    return new Promise((resolve, reject) => {
        let outParm = '';
        let exe_parm = '../gravity-cli getbalance '+format.cliArgs`-a ${ inParm.accountName } -e ${ inParm.asset }`;
        console.log(exe_parm)
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result=stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    resolve(result);
                } catch (err) {
                    console.log("getBalance.err==>",err);
                    reject(err)
                }
            }
        });
    })
}

let getHistory = (inParm) => {
    return new Promise((resolve, reject) => {
        console.log("args===>",inParm)
        let outParm = '';
        let exe_parm = '../gravity-cli gethistory '+format.cliArgs`-m ${ inParm.fromMCI } -c ${ inParm.toMCI } -a ${ inParm.accountName }`
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result=stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    resolve(result);
                } catch (err) {
                    console.log("getHistory.err==>",err);
                    reject(err)
                }
            }
        });
    })
}

let getNewAddress = (inParm) => {
    return new Promise((resolve, reject) => {
        let outParm = '';
        let exe_parm = '../gravity-cli getnewaddress '+format.cliArgs`-a ${ inParm.accountName }`;
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result=stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    resolve(result);
                } catch (err) {
                    console.log("getNewAddress.err==>",err);
                    reject(err)
                }
            }
        });
    })
}


let sendPayments = (inParm) => {
    console.log("inparm===>",inParm)
    return new Promise((resolve, reject) => {
        let outParm = '';
        let exe_parm = '../gravity-cli sendpayments'+' -a '+inParm.accountName+paymentAddressesParse(inParm.transactions)+format.cliArgs([' -s='],inParm.isTransaction);
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result=stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    resolve(result);
                } catch (err) {
                    console.log("sendPayments.err==>",err);
                    reject(err)
                }
            }
        });
    })
};



let createNewAccount = (inParm) => {
    return new Promise((resolve, reject) => {
        let outParm = '';
        let exe_parm = '../gravity-cli createnewaccount '+format.cliArgs([' -a ',' -t '],inParm.accountName, inParm.acctType);
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result=stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    resolve(result);
                } catch (err) {
                    console.log("createNewAccount.err==>",err);
                    reject(err)
                }
            }
        });
    })
}


/*
	*针对sendpayments多个地址和金额的解析
 */
function paymentAddressesParse(transactions){

    var result = [];
    for (let address of Object.keys(transactions)) {
        var value=' -d '+address+' -m '+transactions[address]
        result.push(value);
    }
    return result.join('');
}


let updatePassword = (inParm) => {
    return new Promise((resolve, reject) => {
        let outParm = '';
        let exe_parm = '../gravity-cli updatepassword'+format.cliArgs([' -o ',' -n '],inParm.oldPassword,inParm.newPassword);
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result=stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    resolve(result);
                } catch (err) {
                    console.log("updatePassword.err==>",err);
                    reject(err)
                }
            }
        });
    })
}

let getAllAssets = () => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli getallassets';
        let exe_PATH = path.resolve(__dirname, exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0];
                    resolve(result);
                } catch (err) {
                    console.log("getAllAssets.err==>", err);
                    reject(err)
                }
            }
        });
    })
};

let invokeContract= (inParm) => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli invokecontractwithjson'+format.cliArgs([' -n ',' -j ',' -a '],inParm.account,inParm.invokeJson,inParm.invokeAmount)+' -s='+inParm.send;//format.cliArgs([' -s='],inParm.send);
        let exe_PATH = path.resolve(__dirname, exe_parm);
        console.log("cmd:", exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    //console.log("stdout---------",stdout);
                    let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0];
                    resolve(result);
                } catch (err) {
                    console.log("invokeContract.err==>", err);
                    reject(err)
                }
            }
        });
    })
};


let issueContract = (inParm) => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli issuecontractwithjson'+format.cliArgs([' -n ',' -j '],inParm.account,inParm.issueJson)+' -s='+inParm.send;//format.cliArgs([' -s='],inParm.send);
        let exe_PATH = path.resolve(__dirname, exe_parm);
        console.log("cmd:", exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0];
                    resolve(result);
                } catch (err) {
                    console.log("issueContract.err==>", err);
                    reject(err)
                }
            }
        });
    })
};

let deployContract = (inParm) => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity-cli deploycontractwithjson'+format.cliArgs([' -n ',' -j '],inParm.account,inParm.deployJson)+' -s='+inParm.send;//+format.cliArgs([' -s='],inParm.send);
        let exe_PATH = path.resolve(__dirname, exe_parm);
        console.log("cmd:", exe_parm);
        exec(exe_PATH, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                try {
                    let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0];
                    resolve(result);
                } catch (err) {
                    console.log("issueContract.err==>", err);
                    reject(err)
                }
            }
        });
    })
};

module.exports = {
    getBalance,
    getHistory,
    getNewAddress,
    sendPayments,
    createNewAccount,
    updatePassword,
    invokeContract,
    getAllAssets,
    issueContract,
    deployContract,
};