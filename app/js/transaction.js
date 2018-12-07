let format = require('../../util/format');

let normalTransactionAddrList = 1
let sendPayments = (args, isTx) => {
	gWalletData.sendPayments(args, isTx)
	.then(res => {
		console.log('给多人转账', res);
		if(res.errorCode == 0 && res.data){
			if(isTx == true){
				let tx_lists = $('#tx_list .transfer-list');
				let tx_fees = 0;
				tx_lists.map(index => {
					return tx_fees += Number($('#tx_list .tx-amount').eq(index).val())
				})
				$('.tx-detail .tx-fee').eq(0).text(Number(res.data) + ' B');
				$('.tx-detail .tx-fee').eq(1).text(Number(res.data) + ' N');
				$('.total-pay').text(Number(res.data) + tx_fees + ' N');
			} else if(isTx == false){
				if(format.isBase64(res.data)){
					$('#successModal').modal('toggle');
					$('#succeTxt').text('转账交易成功');
				}else{
					console.log('sendPayments==Error',res.data);
					$('#errorModal').modal('toggle');
					$('#errorTxt').text(res.data);
				}
			}
		}
		$('#successModal').one('hidden.bs.modal', () => {
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			$('#transaction-section .tx-receiver').val('');
			$('#transaction-section .tx-amount').val('');
			$('#tx_list .transfer-list-add').empty();
			$('#transaction-section .tx-fee').text(0);
        });
	})
	.catch(err => {
		console.log('sendPayments==Error',err);
		if(!isTx){
			$('#errorModal').modal('toggle');
			$('#errorTxt').text(err);
		}
	})
}

let checkTransactionsEmpty = (transactions) =>{
	if(transactions.length<1){
		return true;
	}
	for (var tx of transactions) { // 遍历Map
		let key = tx[0];
		let value = tx[1];
		if(value == "" || value == null || key == "" || key == null){
			return true;
		}
	}
	return false;
}
let payAssets = () => {
	$('#payAssets').off().on('click', function() {
		let tx_lists = $('#tx_list .transfer-list');
        let transactions = new Map();
        tx_lists.map(index => {
            transactions.set(format.addMark($('#tx_list .tx-receiver').eq(index).val().trim()), $('#tx_list .tx-amount').eq(index).val().trim());
        })
        if (checkTransactionsEmpty(transactions)){
            document.getElementById("transaction-wrong").innerHTML
            $('#transaction-wrong').text('提示：收款人和转账金额不能为空');
        }else {
            let txData = {
                accountName: sessionStorage.getItem('accName'),
                isTransaction: '',
                transactions: strMapToObj(transactions)
            }
            let isTx = false;
            //输入钱包密码
            $('.pwd-style').val('');
            $('#tradingPwdModal').modal('toggle');
            $('#ipt-wrong').text('');
            // 监听关闭密码输入窗口
            $('#tx-pwd-sure').off().click(function () {
                //$('#tradingPwdModal').on('click', '#tx-pwd-sure', function () {
                //读取数据库交易密码是否输入正确
                let txPwd = $('.pwd-style').val();
                let pwdHash = sessionStorage.getItem('pwdHash')
                if (createDataHash(txPwd) == pwdHash) {
                    $('#ipt-wrong').text('');
                    $('#tradingPwdModal').modal('toggle');
                    sendPayments(txData, isTx);
                } else {
                    //密码输入错误，请重新输入
                    $('#ipt-wrong').text('提示：密码输入错误，请重新输入');
                }

			});
			
			$('body').off('keydown').on('keydown', '#tradingPwdModal', function (e) {
				let x = e.key;
				if (x == 'Enter') {
					let txPwd = $('.pwd-style').val();
					let pwdHash = sessionStorage.getItem('pwdHash')
					if (createDataHash(txPwd) == pwdHash) {
						$('#ipt-wrong').text('');
						$('#tradingPwdModal').modal('toggle');
						sendPayments(txData, isTx);
					} else {
						//密码输入错误，请重新输入
						$('#ipt-wrong').text('提示：密码输入错误，请重新输入');
					}
				}
			});
        }
    })
}
let txFee = () => {
	//交易费计算
	$('#tx_list').on('keyup', '.tx-amount', function(){
		//判断可用余额
		if($('#transaction-section .asset-spendable').attr('data-amount') == 0){
			$('#warnModal').modal('toggle');
    			$('#warnModal .modal-footer').addClass('none');
        		$('#warnTxt').text('此账户可用余额不足，请尝试切换账户！');
        		return;
		}
		console.log($(this).val());
		let tx_lists_fee = $('#tx_list .transfer-list');
		let transactions_fee = new Map();
		tx_lists_fee.map(index => {
			transactions_fee.set(format.addMark($('#tx_list .tx-receiver').eq(index).val().trim()), $('#tx_list .tx-amount').eq(index).val().trim());
		})
		let txFeeData = {
			accountName: sessionStorage.getItem('accName'),
			isTransaction: 'false',
			transactions: strMapToObj(transactions_fee)
		}
		let isTx = true;
		sendPayments(txFeeData, isTx);
	})
}
let showContactList = () => {
	//查找通讯录表，获取好友列表
    walletDB.db.serialize(function() {
        walletDB.db.all("select rowid,* from CONTACTS", (err, res) => {
            if(err !== null){
                console.log('查找通讯录表，获取好友列表失败')
            } else{
                let contact_lists_template = $('#tx_contact_template').html();
                let data = {
                    contactList: res.map(cur => {
                        return {
                            address: cur.address,
                            name: cur.name,
                            id: cur.rowid
                        }
                    })
                }
                // 生成html模版
                let htmlContactList = EJS.render(contact_lists_template, data);
                $('.tx-contact').html(htmlContactList);
            }
        });
    });
}
let txBindEvent = () => {
	$('.add-ress').on('click', function(){
		//let tx_addr_template = $('#tx_addr_template').html();
		let tx_addr_template = `
		<div class="transfer-list fc16 normal-transaction-transfer-list${normalTransactionAddrList}">
			<div class="txhash">
				<input type="text" class="tx-receiver normal-tx-receiver transaction-tx-receiver${normalTransactionAddrList}" placeholder="" />
				<img src="../img/id.png" title="选择账户" class="transaction-addressbook" index="${normalTransactionAddrList}"/>
			</div>
			<span>金额:</span>
			<input type="text" class="tx-num fc8 tx-amount normal-tx-amount" />
			<span>N</span>
			<img class="tx-delete transaction-tx-delete${normalTransactionAddrList}" src="../img/error1.png" index="${normalTransactionAddrList}"/>
		</div>
		`

		$('.transaction-txinfo-box').off().on('click', ".transaction-addressbook", (event) => {
			let index = $(event.target).attr("index")
			$("#add-contacts input").val(".transaction-tx-receiver" + index)
			$("#add-contacts").modal("toggle")
		});
		$("body").on('click', `.transaction-tx-delete${normalTransactionAddrList}`, (event) => {
			let index = $(event.target).attr("index")
			$('.normal-transaction-transfer-list' + index).remove()
		})
		
		$('.transfer-txhash .transfer-list-add').prepend(tx_addr_template);
		normalTransactionAddrList ++;
	})
	$(document).bind('click',function(e){ 
		e.stopPropagation(); 
		$('.all-user1').fadeOut(400);
	}); 
	$('.account-box1').on('click', '.tx-user-photo', function(e){
		e.stopPropagation(); 
		$('.all-user1').fadeIn(400);
	});
	
	$('.account-box2').on('click', '.tx-delete', function(){
		$(this).parent().remove();
	})
	$('.transaction-txinfo-box').off().on('click', ".transaction-addressbook", function(){
        // $("#add-contacts input[type='hidden']").val(".transaction-tx-receiver")
		// $("#add-contacts").modal("toggle")
		let index = $(event.target).attr("index")
		$("#add-contacts input").val(".transaction-tx-receiver" + index)
		$("#add-contacts").modal("toggle")
	})
}
let txInit = () => {
	txBindEvent();	//事件绑定
	payAssets();
	txFee();
	showContactList();
}
txInit();
module.exports = {
    showContactList
}
