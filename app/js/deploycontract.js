function isDeployContractNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function recalculateDeployFee(filePath){
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.log("Read file error:", err);
        }   
        let account = sessionStorage.getItem('accName');
        data = data.replace(/\r?\n|\r|\s/g,"");
        let jsonData = {
            "account": account,
            "deployJson": format.addMark(data),
            "send":false
        };
        gWalletData.deployContract(jsonData).then(res=>{
            console.log(res);
            if(isDeployContractNumeric(res.data)){
                updateDeployTransactionFee(Number(res.data), Number(res.data));
            }else{
                updateDeployTransactionFee("NaN", "NaN");
            }
        }).catch(err=>{
            console.log(err);
            updateDeployTransactionFee("NaN", "NaN");
        });
      });
}
function updateDeployTransactionFee(size, fee) {
    $("#deplay-transaciton-size").html(size)
    $("#deplay-transaciton-fee").html(fee)
}

function deployContractSucceed(){
    $('#successModal').modal('toggle');
	$('#succeTxt').text('资产发布成功');
}

function deployContractFailed(err){
    $('#errorModal').modal('toggle');
    $('#errorTxt').text(err);
}

//部署合约
// var args={
//  account：xxxxx，
//  deployJson:xxxxx,
//  send:false， 如果是计算交易费传send 执行则不用send
// }
function doDeployContract(data){
    let account = sessionStorage.getItem('accName');
    data = data.replace(/\r?\n|\r|\s/g,"");
    let jsonData = {
        "account": account,
        "deployJson": format.addMark(data),
        "send":true
    };
    gWalletData.deployContract(jsonData).then(res=>{
        console.log(res)
        if(format.isBase64(res.data)){
            deployContractSucceed();
            clearDeployContractParams();
            loadIssueContractInfo();
        }else{
            deployContractFailed(res.data);
        }
    }).catch(err=>{
        console.log(err)
        deployContractFailed(err.errorMessage["message"]);
    });

    console.log("Run deploy Contracts");
}
function clearDeployContractParams(){
    $('.deploy-contract-filepath').val("");
}

function deployContractSubmit(data){
    console.log(data)
    doDeployContract(data)
}

const selectDirBtn = document.getElementById('deploy-contract-select-btn')
selectDirBtn.addEventListener('click', (event) => {
    remote.dialog.showOpenDialog({
        filters: [{
	        	name: 'JSON', 
	        	extensions: ['json']
        	}],
        properties: ['openFile'],
    }, (filePath) => {
        if (filePath !== undefined) {
        		console.log('filePath', filePath);
                $('.deploy-contract-filepath').val(filePath);
                recalculateDeployFee(filePath[0])
        }
    });
})

$('#deploy-contract-invoke').on('click', () => {
    let filePath = $('.deploy-contract-filepath').val();
    if(filePath[0] != ""){
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.log("Read file error:", err);
            }   
            deployContractSubmit(data);
        });
    }
})
updateDeployTransactionFee(0, 0)