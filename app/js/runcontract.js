//let format = require('../../util/format');

let currentAsset = ""

const contractFileMap = new Map([
    ["简易验签", "normaltransaction"]]
);
const contractInfoMap = new Map([
    ["简易验签", "简易验签为普通验签智能合约，实现对于代币的普通交易功能"]]
);

function contractNameToContractParamsFile(contract) {
    return contract.replace(/\s/g, '').toLocaleLowerCase() + ".html";
}

function updateSelectableAssets(assetArray) {
    let assetOptions = "";
    let arr = format.objToStrMap(assetArray);
    let index = 0;
    arr.forEach((value, key) => {
        assetOptions = assetOptions + `<option value="${value}">${key}</option>`;
        if (index == 0) {
            updateAsset(key, value);
        }
        assetArray[index] = { key: value };
        index++;
    })
    $('.select-assets').html(assetOptions);
}

function listSelectableContract(data) {
    let contractOptions = "";
    let activeContract = "";
    data.forEach((element, index) => {
        if (index == 0) {
            activeContract = { "name": element.name, "address": element.address }
            contractOptions = contractOptions + `<li role="presentation" class="select-contract-option active">
            <a href="#${element.address}" aria-controls="${element.address}" role="tab" data-toggle="tab" class="contract-select-option">${element.name}</a>
            </li>`;
        } else {
            contractOptions = contractOptions + `<li role="presentation" class="select-contract-option">
                <a href="#${element.address}" aria-controls="${element.address}" role="tab" data-toggle="tab" class="contract-select-option">${element.name}</a>
            </li>`;
        }
    });
    $('.select-contract').html(contractOptions);

    return activeContract
}

function loadContractParamContent(activeContract) {
    let activeContractFile = "default.html"
    if (activeContract.name != "") {
        activeContractFile = contractFileMap.get(activeContract.name) + ".html";
    }

    $('.cont-parameters-content').load("../views/sections/contracts-params/" + activeContractFile,
        function (responseText, textStatus, req) {
            if (textStatus == "error") {
                $('.cont-parameters-content').load("../views/sections/contracts-params/default.html", function () {
                    onParamsChange(recalculateRunContractFee)
                });
            } else {
                onParamsChange(recalculateRunContractFee)
            }

        });

}

function bindAssetOptionsEvent() {
    $('.run-contract-select-assets').on('change', (event) => {
        let option = $('.run-contract-select-assets option:selected');
        let key = option.html();
        let value = option.val();
        updateAsset(key, value);
        recalculateRunContractFee()
    });
}

function bindContractSelectOptionsEvent() {
    $('body').off().on('click', '.contract-select-option', (event) => {
        let contractName = $(event.target).html();
        contractFile = contractFileMap.get(contractName) + ".html";
        if (contractFile == ".html") {
            contractFile = "default.html"
        }
        $('.cont-parameters-content').load("../views/sections/contracts-params/" + contractFile);

        recalculateRunContractFee()
    });

}

function updateSelectedContractInfo(activeContract) {
    let args = { "caddr": activeContract.address }
    clearParamsInfo();

    updateContractInfo(contractInfoMap.get(activeContract.name));

    gravityData.getContractInfo(args).then((res) => {
        let contractInfo = JSON.parse(res.data)
        if (contractInfo.params_key != undefined && contractInfo.params_key != null) {
            contractInfo.params_key.forEach((element, index) => {
                AddParamInfo("PARAM", element, contractInfo.params_value[index]);
            });
        } else {
            AddParamInfo("(无)");
        }
    }).catch(error => {
        console.log("Get contractInfo error:", error)
    });
}

function updateSelectableContract(data) {
    let activeContract = listSelectableContract(data);
    loadContractParamContent(activeContract);
    updateSelectedContractInfo(activeContract);
}

function updateCashAmount(spendable, total, assetName) {
    if (assetName == "Gravity") {
        spendable = spendable + " N";
        total = total + " N";
    } else {
        spendable = spendable + " " + assetName;
        total = total + " " + assetName;
    }
    $('.spendable-cash').html(spendable);
    $('.total-cash').html(total);
}

function updateInvokeTransactionFee(transactionSize, transactionFee) {
    $('.expected-transaction-size').html(transactionSize);
    $('.expected-transaction-fee').html(transactionFee);
}

function updateContractInfo(contractInfo) {
    $('.contract-info').html(contractInfo);
}
function clearParamsInfo() {
    $('.params-info').html("");
}
function runContractErrorInfo(errInfo) {
    $(".run-contract-error-info").html(errInfo)
}
function runContractClearErrorInfo() {
    $(".run-contract-error-info").html("")
}

function AddParamInfo(type, name, info) {
    if (name == undefined || info == undefined) {
        $('.params-info').html(type);
    } else {
        let paramsInfo = $('.params-info').html();
        let newParamInfo = type + "[" + name + "]:" + info;
        $('.params-info').html(paramsInfo + newParamInfo);
    }
}

function generateInvokeJSON() {
    let contract = $('.select-contract-option.active > .contract-select-option').attr("aria-controls");
    let asset = $('.select-assets').val();
    let params = {};
    getParamsJSON(params);

    let inputs = []
    if (params.inputs != null && params.inputs != undefined) {
        inputs = params.inputs
    }
    let data = {
        "Header": {
            "App": 3,
            "Version": 1,
            "PayloadHash": ""
        },
        "Asset": asset,
        "ContractAddr": contract,
        "GlobalParamKey": params.globalParamsKey,
        "GlobalParamValue": params.globalParmsValue,
        "Outputs": params.outputs,
        "Inputs": params.inputs
    }

    console.log(data);
    console.log(JSON.stringify(data))
    console.log(params.inputsInfo)
    return [data, params.inputsInfo]
}

function clearRunContractParams() {
    clearContractParams();
}

function invokeContractSucceed() {
    $('#successModal').modal('show');
    $('#succeTxt').text('合约运行成功');
}
function invokeContractFailed(err) {
    $('#errorModal').modal('show');
    $('#errorTxt').text(err);
}

//执行智能合约或计算交易费
// var args={
//  account：xxxxx，
//  invokeJson：xxxx，
//  invokeAmount：xxxxxx，
//  send:false，如果是计算交易费传send 执行则不用send
// }
function doInvokeContract(data) {
    let account = sessionStorage.getItem('accName');
    let jsonData = {
        "account": account,
        "invokeJson": format.addMark(JSON.stringify(data[0])),
        "invokeAmount": data[1].amount,
        "send": true
    };
    gWalletData.invokeContract(jsonData).then(res => {
        console.log(res)
        if (format.isBase64(res.data)) {
            invokeContractSucceed();
            clearRunContractParams();
        } else {
            invokeContractFailed(res.data);
        }
    }).catch(err => {
        invokeContractFailed(err.errorMessage["message"]);
    });
    console.log("invoke contract");

}

function submitRunContract() {
    runContractClearErrorInfo();
    if (!checkRunParams()) {
        return
    }

    $('.pwd-style').val('');
    $('#tradingPwdModal').modal('show');
    //监听关闭密码输入窗口
    $('#tradingPwdModal').on('click', '#tx-pwd-sure', function () {
        //读取数据库交易密码是否输入正确
        let txPwd = $('.pwd-style').val();
        let pwdHash = sessionStorage.getItem('pwdHash')
        if (createDataHash(txPwd) == pwdHash) {
            $('#ipt-wrong').text('');

            let data = generateInvokeJSON();
            $('#tradingPwdModal').modal('hide');
            doInvokeContract(data);
        } else {
            //密码输入错误，请重新输入
            $('#ipt-wrong').text('提示：密码输入错误，请重新输入');
        }
    });

}
function isInvokeContractNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
// var args={
//  account：xxxxx，
//  asset：xxxx，
//  contract：xxxxxx，
//  param：xxxxxx，
//  amount：[]
//  send:false，如果是计算交易费传send 执行则不用send
// }
function recalculateRunContractFee() {
    let data = generateInvokeJSON();
    let account = sessionStorage.getItem('accName');
    let jsonData = {
        "account": account,
        "invokeJson": format.addMark(JSON.stringify(data[0])),
        "invokeAmount": data[1].amount,
        "send": false
    };
    gWalletData.invokeContract(jsonData).then(res => {
        console.log(res)
        if (isInvokeContractNumeric(res.data)) {
            updateInvokeTransactionFee(Number(res.data), Number(res.data));
        } else {
            updateInvokeTransactionFee("NaN", "NaN");
        }
    }).catch(err => {
        updateInvokeTransactionFee("NaN", "NaN");
    });
}

function bindListener() {
    bindAssetOptionsEvent();
    bindContractSelectOptionsEvent();
    bindSubmitEvent();
    bindIntervalRefreshAsset()
}

function bindSubmitEvent() {
    $(".invoke-contract").click(() => {
        submitRunContract();
    });
}

function bindIntervalRefreshAsset() {
    setInterval(() => {
        if (currentAsset != "") {
            //console.log("update balance:", currentAsset)
            updateAccountBalanceByAsset(currentAsset);
        } else {
            updateAccountBalanceByAsset("Gravity");
        }
    }, 1000)
}

function updateAccountBalanceByAsset(name) {
    let account = sessionStorage.getItem('accName');
    let args = {
        "accountName": account,
        "asset": name
    }
    gWalletData.getBalance(args).then((res) => {
        let objs = JSON.parse(res.data);
        objs.forEach((obj) => {
            if (obj.balanceAccountName == account) {
                let total = obj.balanceAsset[0].assetTotal;
                let spendable = obj.balanceAsset[0].assetSpendable;
                let assetName = obj.balanceAsset[0].assetName;
                updateCashAmount(spendable, total, assetName);
                return;
            }
        });

    }).catch((error) => {
        updateCashAmount(0, 0, name);
        console.log("Get balance error:" + error);
    });
}

function updateContractByAsset(hash) {
    let args = { 'assetHash': hash };
    gravityData.getAllContractsByAsset(args)
        .then((res) => {
            let contracts = JSON.parse(res.data);
            updateSelectableContract(contracts);
        }).catch((error) => {
            console.log(">>>:", error)
            console.log("Get all contracts by asset error:" + error);
        });
}

function updateAsset(name, hash) {
    console.log(">>>>>>>>>>>>")
    currentAsset = name
    updateContractByAsset(hash);
    updateAccountBalanceByAsset(name);
}

function listAssetsInSelect() {
    gWalletData.getAllAssets()
        .then(res => {
            console.log("11111:", res.data);
            data = JSON.parse(res.data);
            updateSelectableAssets(data);
        }).catch(err => {
            console.log('getAllAssets', err)
        });
}

function checkRunParams() {
    errInfo = checkContractParams();
    if (errInfo != null) {
        runContractErrorInfo(errInfo);
        return false;
    }
    return true;
}

listAssetsInSelect()
bindListener();

updateInvokeTransactionFee(0, 0);
