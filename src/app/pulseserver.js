
import pulse from './tools/pulse';
import provider from './dataproviderclient';

function registerPulse() {
    pulse.registerPulseServer("balanceupdatepulse", (callback) => balanceUpdate(callback), pulse.FASTFEEDBACK);
    pulse.registerPulseServer("networkstatuspulse", (callback) => netStatusUpdate(callback), pulse.SLOWFEEDBACK);
    pulse.registerPulseServer("blockchaininfopulse", (callback) => blockchainInfoUpdate(callback), pulse.MEDIUMFEEDBACK);
    pulse.registerPulseServer("syncprogresspulse", (callback) => syncProcessorUpdate(callback), pulse.MEDIUMFEEDBACK);
    pulse.registerPulseServer("recenttxpulse", (callback) => recentTxUpdate(callback), pulse.MEDIUMFEEDBACK);
    pulse.registerPulseServer("txhistorypulse", (callback) => txHistoryUpdate(callback), pulse.SLOWFEEDBACK);
}


function balanceUpdate(callback) {
    let paramsAccount = {
        accountName: sessionStorage.getItem("account")
    };
    provider.requestWithResponse("getbalance", paramsAccount, res => {
        callback(res)
    });
}

function netStatusUpdate(callback) {
    provider.requestWithResponse("getnetworkstatus", {}, res => {
        callback(res);
    });
}

function blockchainInfoUpdate(callback) {
    provider.requestWithResponse("getblockchaininfo", {}, res => {
        callback(res);
    });
}

function syncProcessorUpdate(callback) {
    provider.requestWithResponse("getsyncprogress", {}, res => {
        callback(res);
    });
}

function recentTxUpdate(callback) {
    let count = 15;
    let paramsTX = {
        accountName: sessionStorage.getItem("account"),
        count
    };
    provider.requestWithResponse("listtx", paramsTX, res => {
        callback(res);
    })
}

function txHistoryUpdate(callback) {
    let count = 10000;
    let paramsTX = {
        accountName: sessionStorage.getItem("account"),
        count
    };
    provider.requestWithResponse("listtx", paramsTX, res => {
        callback(res);
    })
}


let pulseServer = {
    registerPulse,
}

export default pulseServer;