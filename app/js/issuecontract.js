let curAllocationIndex = 1;
let curSupportedContractIndex = 0;
let contractConfig = new Map()
let contractConfigCount = 0
let isFixedDenomination = false
const contractNoteMap = new Map([
    ["简易验签", "简易验签为普通验签智能合约，实现对于代币的普通交易功能"]]
);
const contractConfigFileMap = new Map([
    ["简易验签", "normaltransaction"]]
);

function contractNameToContractParamsFile(contract) {
    let contractName = contractConfigFileMap.get(contract)
    if (contractName == undefined || contractName == "") {
        return "default.html"
    }
    let activeContractFile = contractName + ".html";
    return activeContractFile
}

function addSupportedContract(contract) {
    $('.selected-support-contracts').append(`
    <tr class="selected-support-contract-opt selected-support-contract-opt${curSupportedContractIndex}">
        <td class="col-md-6 selected-support-contract-name">${contract}</td>
        <td class="col-md-6 cm cp">
            <span class="selected-support-contract-updateopt${curSupportedContractIndex}" index="${curSupportedContractIndex}">修改</span>
            <span>/</span>
            <span class="selected-support-contract-deleteopt${curSupportedContractIndex}" index="${curSupportedContractIndex}">删除</span>
        </td>
    </tr>
    `)

    $("body").on('click', `.selected-support-contract-deleteopt${curSupportedContractIndex}`, (event) => {
        let index = $(event.target).attr('index');
        removeSupportedContract(index);
    })
    $("body").on('click', `.selected-support-contract-updateopt${curSupportedContractIndex}`, (event) => {
        let index = $(event.target).attr('index');
        let key = $(".selected-support-contract-opt" + index + " .selected-support-contract-name").html().replace(/\s/g, '').toLocaleLowerCase()
        showConfigModal(key)

    })

    curSupportedContractIndex++
}

function removeAllSupportedContract() {
    contractConfigCount = 0;
    contractConfig = new Map();
    $(".selected-support-contract-opt").remove();
}

function removeSupportedContract(index) {
    let key = $(".selected-support-contract-opt" + index + " .selected-support-contract-name").html().replace(/\s/g, '').toLocaleLowerCase()

    contractConfig.delete(key);
    contractConfigCount--;
    $(".selected-support-contract-opt" + index).remove();
}

function addNewAllocationAddress() {
    $('.assets-allocation').append(`
    <div class="transfer-list fc16 div-allocation div-allocationIndex${curAllocationIndex}">
        <span>转账给：</span>
        <div class="txhash">
            <input type="text" class="issue-tx-receiver tx-allocation-receiver" placeholder="">
            <img src="../img/id.png" title="选择账户" class="issue-addressbook" index="${curAllocationIndex}">
        </div>
        <span>金额:</span>
        <input type="text" class="tx-num fc8 issue-tx-amount tx-allocation-amount">
        <span>N</span>
        <img class="tx-delete remove-allocationIndex${curAllocationIndex}" index="${curAllocationIndex}" src="../img/error1.png">
    </div>
    `);

    $("body").on('click', `.remove-allocationIndex${curAllocationIndex}`, (event) => {
        rebindRemoveAllocationEventListener()
    })
    $('.issue-addressbook').off().on('click', (event) => {
        let index = $(event.target).attr("index")
        $("#add-contacts input").val(".div-allocationIndex" + index + " .tx-allocation-receiver")
        $("#add-contacts").modal("toggle")
    });

    curAllocationIndex++;
}

function removeAllocationAddress(index) {
    $(".div-allocationIndex" + index).remove();
}

function updateSupportedContract(supportableContracts) {
    let contractOptions = "";
    let activeContract = "";
    supportableContracts.forEach((element, index) => {
        if (index == 0) {
            activeContract = element;
            contractOptions = contractOptions + `<li role="presentation" class="active">
            <a href="#${element.adress}" aria-controls="${element.adress}" address="${element.address}" role="tab" data-toggle="tab">${element.name}</a>
            </li>`
        } else {
            contractOptions = contractOptions + `<li role="presentation">
            <a href="#${element.adress}" aria-controls="${element.adress}" address="${element.address}" role="tab" data-toggle="tab">${element.name}</a>
            </li>`
        }
    });
    $('.support-contract').html(contractOptions);
    return activeContract
}

function updateSupportedContractInfo(supportedContractInfo) {
    $(".support-contract-info").html(supportedContractInfo)
}

function updateIssueTransactionFee(size, fee) {
    $("#issue-transaction-size").html(size)
    $("#issue-transaction-fee").html(fee)
}

function addActiveContractToList() {
    let key = $(".support-contract .active a").html().replace(/\s/g, '').toLocaleLowerCase()
    if (!contractConfig.has(key)) {
        // contract = $('#contract-config-modal .modal-title').html()
        addSupportedContract(key)
        contractConfigCount++;
    }
    let contractAddress = $(".support-contract .active a").attr("address");
    let data = generateJSON(contractAddress)
    contractConfig.set(key, data)

    recalculateIssueContractFee()
}
function btnConfigSucc() {
    if (!onContractConfigConfirm()) {
        return
    }
    addActiveContractToList();
    $('#contract-config-modal').modal('toggle');
}

function showConfigModal(key) {
    if (contractConfig.get(key) != null && contractConfig.get(key) != undefined) {
        let contractAddress = $(".support-contract .active a").attr("address");
        // let data = loadJSON(contractAddress)
        // contractConfig.set(key, data)
        loadJSON(contractConfig.get(key))
    }
    $('#contract-config-modal').modal('toggle');
}

function rebindRemoveAllocationEventListener() {
    let index = $(event.target).attr('index');
    removeAllocationAddress(index);
    recalculateIssueContractFee()
}
function bindAllocationAddressEventListener() {
    $('.add-ress').on('click', function () {
        addNewAllocationAddress();
        rebindChangeFormListener();
    });
    $("body").on('click', `.remove-allocationIndex0`, (event) => {
        rebindRemoveAllocationEventListener()
    });
}

function bindAddContractConfigEventListener() {
    $(".deploy-add").on('click', (event) => {
        let activeContractFile = contractNameToContractParamsFile($(".support-contract .active a").html());
        let contractAddress = $(".support-contract .active a").attr("address");
        $('#contract-config-modal .modal-body').load("../views/sections/contracts-config/" + activeContractFile, () => {
            if (hasConfig()) {
                let key = $(".support-contract .active a").html().replace(/\s/g, '').toLocaleLowerCase();
                showConfigModal(key);
            } else {
                addActiveContractToList();
            }
        });
    });
}

function bindConfigSuccessEventListener() {
    $("#btn-config-succ").on('click', btnConfigSucc);
}

function bindFixedDenominationEventListener() {
    $('.fix-denomination').on('click change', (e) => {
        if (e.type == "change") {
            let value = e.target.value
            if (value == 1) {
                $('.denominations').removeAttr("disabled")
                isFixedDenomination = true
            } else {
                $('.denominations').val("")
                $('.denominations').attr("disabled", "disabled")
                isFixedDenomination = false
            }
        }
    });
}

function issueAssetSucceed() {
    $('#successModal').modal('show');
    $('#succeTxt').text('资产发布成功');
}

function issueAssetFailed(err) {
    $('#errorModal').modal('show');
    $('#errorTxt').text(err);
}

//发行资产或计算交易费
// var args={
//  account：xxxxx，
//  issueJson:xxxxx,
//  send:false， 如果是计算交易费传send 执行则不用send
// }
function doIssueAsset(data) {
    let account = sessionStorage.getItem('accName');
    let jsonData = {
        "account": account,
        "issueJson": format.addMark(JSON.stringify(data)),
        "send": true
    }

    console.log(">>>>>>>>send issue:", jsonData);
    gWalletData.issueContract(jsonData).then(res => {
        console.log(res)
        if (format.isBase64(res.data)) {
            issueAssetSucceed();
            listAssetsInSelect();
            clearIssueContractParams();

            updateIssueTransactionFee(0, 0);
        } else {
            issueAssetFailed(res.data);
        }
    }).catch(err => {
        console.log(err)
        issueAssetFailed(err.errorMessage["message"]);
    });
    console.log("Run issue asset");
}
function issueMessageOnSubmit() {
    let account = sessionStorage.getItem('accName');
    let args = {
        account,//optional
    }

    clearIssueContractErrorInfo()
    if (!checkIssueParams()) {
        return
    }

    let data = generateIssueJSON()
    doIssueAsset(data)
}

function bindSubmitEventListener() {
    $('#issue-asset').click(() => {
        $('.pwd-style').val('');
        $('#tradingPwdModal').modal('show');
        //监听关闭密码输入窗口
        $('#tx-pwd-sure').off().click(function () {
            //读取数据库交易密码是否输入正确
            let txPwd = $('.pwd-style').val();
            let pwdHash = sessionStorage.getItem('pwdHash')
            if (createDataHash(txPwd) == pwdHash) {
                $('#ipt-wrong').text('');
                $('#tradingPwdModal').modal('hide');
                issueMessageOnSubmit()
            } else {
                //密码输入错误，请重新输入
                $('#ipt-wrong').text('提示：密码输入错误，请重新输入');
            }
        })
    });
}

function bindaddressbookEventListener() {
    $('.issue-addressbook').off().on('click', () => {
        let index = $(event.target).attr("index")
        $("#add-contacts input[type='hidden']").val(".div-allocationIndex" + index + " .tx-allocation-receiver")
        $("#add-contacts").modal("toggle")
    });
}

function rebindChangeFormListener() {
    $('#issue-contract-section input').off().on('change', () => {
        recalculateIssueContractFee()
    });
    $('#issue-contract-section textarea').off().on('change', () => {
        recalculateIssueContractFee()
    })
    bindFixedDenominationEventListener()
}

function bindAllocationListener() {
    bindAllocationAddressEventListener()
    bindaddressbookEventListener()
}
function bindContractConfigListener() {
    bindAddContractConfigEventListener()
    bindConfigSuccessEventListener()
}

function bindListener() {
    bindAllocationListener()
    bindContractConfigListener()
    bindFixedDenominationEventListener()
    bindSubmitEventListener()
    rebindChangeFormListener()
}

function generateAddrJSON() {
    let allocationAddrJSON = [];
    let allocationValueJSON = [];
    let receivers = $(".tx-allocation-receiver");
    let amounts = $(".tx-allocation-amount");
    for (let i = 0; i < amounts.length; i++) {
        allocationAddrJSON.push(receivers[i].value);
        allocationValueJSON.push(Number(amounts[i].value));
    }
    let addrJSON = [allocationAddrJSON, allocationValueJSON];
    return addrJSON
}

function checkAddrParams() {
    let addrJSON = []
    let receivers = $(".tx-allocation-receiver")
    let amounts = $(".tx-allocation-amount")
    for (let i = 0; i < amounts.length; i++) {
        if (receivers[i].value == undefined || receivers[i].value == "") {
            issueContractErrorInfo("分配地址不能为空");
            return false
        }
        if (amounts[i].value == undefined || amounts[i].value == "" || !Number.isInteger(Number(amounts[i].value))) {
            issueContractErrorInfo("分配金额必须是整数");
            return false
        }
    }
    return true
}

function parseDenominationsNum(denominations) {
    let data = []
    denominations.forEach((element) => {
        data.push(Number(element))
    });
    return data
}

function generateIssueJSON() {

    let name = $('.issue-name').val();
    let amount = $('.issue-amount').val();
    let denominations = [];
    if (isFixedDenomination) {
        denominations = $('.denominations').val().split(";");
    }
    let allocations = generateAddrJSON();
    let note = $('.issue-info').val();

    let configDefs = [...contractConfig.values()];

    let data = {
        "Meta": {
            "Header": {
                "App": 4,
                "Version": 1,
                "PayloadHash": ""
            },
            "Name": name,
            "Cap": Number(amount),
            "FixedDenominations": isFixedDenomination,
            "Denominations": parseDenominationsNum(denominations),
            "AllocationAddr": allocations[0],
            "AllocationAmount": allocations[1],
            "Contracts": configDefs,
            // "PublisherAddress": publisherAddress
        },
        "Note": note
    };
    console.log(data);
    console.log(JSON.stringify(data));
    return data;
}
function isIssueContractNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function recalculateIssueContractFee() {
    let data = generateIssueJSON()

    let account = sessionStorage.getItem('accName');
    let jsonData = {
        "account": account,
        "issueJson": format.addMark(JSON.stringify(data)),
        "send": false
    }
    gWalletData.issueContract(jsonData).then(res => {
        console.log(res)
        if (isIssueContractNumeric(res.data)) {
            updateIssueTransactionFee(Number(res.data), Number(res.data));
        } else {
            updateIssueTransactionFee("NaN", "NaN");
        }
    }).catch(err => {
        updateIssueTransactionFee("NaN", "NaN");
    });
}
function updateContractNoteByActive(activeContract) {
    let note = contractNoteMap.get(activeContract.name);
    if (note == "") {
        updateSupportedContractInfo("(无)");
    } else {
        updateSupportedContractInfo(note);
    }
}

function loadIssueContractInfo() {
    gravityData.getAllContracts().then((res) => {
        let supportableContracts = JSON.parse(res.data);
        let activeContract = updateSupportedContract(supportableContracts);
        updateContractNoteByActive(activeContract);
    }).catch((error) => {
        console.log('Get all contracts error', error);
    });
}

function issueContractErrorInfo(errInfo) {
    $(".issue-contract-error-info").html(errInfo);
}
function clearIssueContractErrorInfo() {
    $(".issue-contract-error-info").html("");
}

function clearIssueContractParams() {
    $('.issue-name').val("");
    $('.issue-amount').val("");
    $('.denominations').val("");

    $(".tx-allocation-receiver").val("");
    $(".tx-allocation-amount").val("");

    $('.issue-info').val("");

    removeAllSupportedContract();
}

function checkIssueParams() {
    let name = $('.issue-name').val();
    if (name == "" || name == undefined) {
        errInfo = "资产名称不能为空";
        issueContractErrorInfo(errInfo);
        return false;
    }

    let amount = $('.issue-amount').val();
    //TODO
    if (amount == "" || amount == undefined || !Number.isInteger(Number(amount))) {
        errInfo = "资产总量必须是整数";
        issueContractErrorInfo(errInfo);
        return false;
    }
    if (isFixedDenomination) {
        let denominations = $('.denominations').val();
        if (denominations == "") {
            errInfo = "资产面额格式不正确";
            issueContractErrorInfo(errInfo);
            return false;
        }
    }
    if (contractConfigCount == 0) {
        errInfo = "资产必须选择智能合约";
        issueContractErrorInfo(errInfo);
        return false;
    }
    return checkAddrParams();
}

loadIssueContractInfo();
bindListener();
updateIssueTransactionFee(0, 0);
