// This file is required by the index.views file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {
    ipcMain
} = require('electron');
const gwallet_cli = require('./exe/js/gwallet-cli');
const gwallet = require('./exe/js/gwallet');
const gravity = require('./exe/js/gravity');
const command = require('./exe/js/command');
const gravity_cli = require('./exe/js/gravity-cli');
const responseData = require('./util/responseData');

let monitor=(topic,func)=>{
    ipcMain.on(topic, (event, arg) => {
        func
            .then((res) => {
                event.sender.send(topic, responseData.setResponse({
                    _data: res
                }));
            })
            .catch(err => {
                console.log(topic+'err', err);
                event.sender.send(topic, responseData.setResponse({
                    _errorCode: 99,
                    _errorMessage: err
                }));
            });
    });
};

ipcMain.on('getBalance', (event, arg) => {
    gwallet_cli.getBalance(arg)
        .then((res) => {
            event.sender.send('getBalance', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            console.log('getBalance err', err);
            event.sender.send('getBalance', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});

ipcMain.on('getSeed', (event, arg) => {
    gwallet.getSeed(arg)
        .then((res) => {
            console.log(res)
            event.sender.send('getSeed', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            console.log('getSeed err', err);
            event.sender.send('getSeed', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});

ipcMain.on('validateSeed', (event, arg) => {
    gwallet.validateSeed(arg)
        .then((res) => {
            console.log(res)
            event.sender.send('validateSeed', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            console.log('validateSeed err', err);
            event.sender.send('validateSeed', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});

ipcMain.on('recoverWallet', (event, arg) => {
    gwallet.recoverWallet(arg)
        .then((res) => {
            console.log(res)
            event.sender.send('recoverWallet', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            console.log('recoverWallet err', err);
            event.sender.send('recoverWallet', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});

ipcMain.on('startWallet', (event, arg) => {
    gwallet.startWallet(arg)
        .then((res) => {
            event.sender.send('startWallet', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            console.log('startWallet err', err);
            event.sender.send('startWallet', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});

ipcMain.on('getHistory', (event, arg) => {
    gwallet_cli.getHistory(arg)
        .then((res) => {
            console.log(res)
            event.sender.send('getHistory', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            console.log('getHistory err', err);
            event.sender.send('getHistory', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});


ipcMain.on('getNewAddress', (event, arg) => {
    gwallet_cli.getNewAddress(arg)
        .then((res) => {
            console.log(res)
            event.sender.send('getNewAddress', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            console.log('getNewAddress err', err);
            event.sender.send('getNewAddress', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});

ipcMain.on('getPeers', (event, arg) => {
    gravity_cli.getPeers(arg)
        .then((res) => {
            event.sender.send('getPeers', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('getPeers', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});

ipcMain.on('getCurrentHeight', (event, arg) => {
    gravity_cli.getCurrentHeight(arg)
        .then((res) => {
            event.sender.send('getCurrentHeight', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('getCurrentHeight', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});

ipcMain.on('getCurrentMCI', (event, arg) => {
    gravity_cli.getCurrentMCI(arg)
        .then((res) => {
            event.sender.send('getCurrentMCI', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('getCurrentMCI', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});

ipcMain.on('sendPayments', (event, arg) => {
    gwallet_cli.sendPayments(arg)
        .then((res) => {
            event.sender.send('sendPayments', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('sendPayments', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});


ipcMain.on('isCommittee', (event, arg) => {
    gravity_cli.isCommittee(arg)
        .then((res) => {
            event.sender.send('isCommittee', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('isCommittee', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});


ipcMain.on('createNewAccount', (event, arg) => {
    gwallet_cli.createNewAccount(arg)
        .then((res) => {
            event.sender.send('createNewAccount', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('createNewAccount', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});


ipcMain.on('getMiningSpeed', (event, arg) => {
    gravity_cli.getMiningSpeed(arg)
        .then((res) => {
            event.sender.send('getMiningSpeed', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('getMiningSpeed', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});


ipcMain.on('startMining', (event, arg) => {
    gravity_cli.startMining(arg)
        .then((res) => {
            event.sender.send('startMining', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('startMining', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});

ipcMain.on('stopMining', (event, arg) => {
    gravity_cli.stopMining(arg)
        .then((res) => {
            event.sender.send('stopMining', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('stopMining', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});


ipcMain.on('getMCIByUnitHash', (event, arg) => {
    gravity_cli.getMCIByUnitHash(arg)
        .then((res) => {
            event.sender.send('getMCIByUnitHash', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('getMCIByUnitHash', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});


ipcMain.on('updatePassword', (event, arg) => {
    gwallet_cli.updatePassword(arg)
        .then((res) => {
            event.sender.send('updatePassword', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('updatePassword', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});

ipcMain.on('command', (event, arg) => {
    command.command(arg)
        .then((res) => {
            event.sender.send('command', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('command', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});


ipcMain.on('startGravity', (event, arg) => {
    gravity.startGravity()
        .then((res) => {
            event.sender.send('startGravity', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('startGravity', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});


ipcMain.on('getAllContracts', (event, arg) => {
    gravity_cli.getAllContracts()
        .then((res) => {
            event.sender.send('getAllContracts', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('getAllContracts', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});


ipcMain.on('getAllContractsByAsset', (event, arg) => {
    gravity_cli.getAllContracts()
        .then((res) => {
            event.sender.send('getAllContractsByAsset', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('getAllContractsByAsset', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});

ipcMain.on('getContractInfo', (event, arg) => {
    gravity_cli.getContractInfo(arg)
        .then((res) => {
            event.sender.send('getContractInfo', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('getContractInfo', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});

ipcMain.on('invokeContract', (event, arg) => {
    gwallet_cli.invokeContract(arg)
        .then((res) => {
            event.sender.send('invokeContract', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('invokeContract', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});


ipcMain.on('getAllAssets', (event, arg) => {
    gwallet_cli.getAllAssets()
        .then((res) => {
            event.sender.send('getAllAssets', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('getAllAssets', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});


// ipcMain.on('getAllContractsByAsset', (event, arg) => {
//     gravity_cli.getAllContractsByAsset(arg)
//         .then((res) => {
//             console.log("=================+++++++++>",res)
//             event.sender.send('getAllContractsByAsset', responseData.setResponse({
//                 _data: res
//             }));
//         })
//         .catch(err => {
//             event.sender.send('getAllContractsByAsset', responseData.setResponse({
//                 _errorCode: 99,
//                 _errorMessage: err
//             }));
//         });
// });


ipcMain.on('getAllContracts', (event, arg) => {
    gravity_cli.getAllContracts()
        .then((res) => {
            event.sender.send('getAllContracts', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('getAllContracts', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});

ipcMain.on('issueContract', (event, arg) => {
    gravity_cli.issueContract()
        .then((res) => {
            event.sender.send('issueContract', responseData.setResponse({
                _data: res
            }));
        })
        .catch(err => {
            event.sender.send('issueContract', responseData.setResponse({
                _errorCode: 99,
                _errorMessage: err
            }));
        });
});