let initAddrId = 0, addrRows, addrLists;
let assetsGetHistory = () => {
	let param = {
		accountName: sessionStorage.getItem('accName'),
		fromMCI: '0',
        toMCI: sessionStorage.getItem('MCI') || '10000'
	}
	gWalletData.getHistory(param)
		.then(res => {
			if(res.errorCode == 0){
				txHistorysList = JSON.parse(res.data);
				let data = {
					details: txHistorysList.slice(0,5).map(cur => {
						return {
							TimeStamp: new Date(cur.TimeStamp * 1000).toLocaleString(),
							MessageKey: cur.MessageKey
						}
					})
				};
				let tx_history_template = $('#tx_history_template').html();
			    let htmlTxHistory = EJS.render(tx_history_template, data);
			    $('#assets-section .tx-history-table>tbody').html(htmlTxHistory);
			}
		})
		.catch(err => {
			console.log('getHistory==Error',err);
		})
}
let getNewAddress = () => {
	$('#addAddr').on('click', function(){
		let param = {
			accountName: 'default'
		}
		gWalletData.getNewAddress(param)
			.then(res => {
				if(res.errorCode == 0){
					let newAddrData = res.data;
					//添加地址后插入到地址表中
					walletDB.db.serialize(function() {
					    walletDB.db.run("INSERT INTO ADDRESS(address) VALUES (?)", newAddrData, (err, res) => {
					        if(err == null){
					        		let newAddr = {
									addr: newAddrData
								}
								let addr_add = $('#addr_add').html();		
								// 生成html模版
							    let htmlNewAddr = EJS.render(addr_add, {newAddr});
								$('.assert-add-table>tbody').prepend(htmlNewAddr);
					        }
					    });
					});
				}
			})
			.catch(err => {
				console.log('getNewAddress==Error',err);
			})
	})
}
let getAddrList = () => {
	//查找地址表，获取地址列表
	walletDB.db.serialize(function() {
	    walletDB.db.all("select rowid,* from ADDRESS", (err, res) => {
	        if(err == null){
	        		addrRows = res.length;
	        		addrLists = res;
	        		$('#assets-section .assert-add-table>tbody').html('');
	        		let addr_add_init = $('#addr_add').html();
		        let newAddr;
		        res.forEach(item => {
		        		newAddr = {
						addr: item.address
					}	
					// 生成html模版
				    let htmlNewAddrInit = EJS.render(addr_add_init, {newAddr});
					$('#assets-section .assert-add-table>tbody').append(htmlNewAddrInit);
		        })
				showAddress(initAddrId);	//显示默认地址
	        }
	    });
	});
}
let showAddress = (id) => {
	if(id >= addrRows){
		id = 0;
		initAddrId = 0;
	}
	//查找地址
	$('.assets-search input').val(addrLists[id].address)
	$('.remaining-r .copy').attr('data-addr', addrLists[id].address)
	createQRCode(document.querySelector('.assets-search canvas'), addrLists[id].address, 100);
}
let showTxDetails = () => {
	$('#assets-section').off('click').on('click', '.tx-details', function(){
		let txId = $(this).attr('data-id');
		let curDetail = txHistorysList.filter(el => el.MessageKey == txId)[0];
		let MessageContent = curDetail.MessageContent;
		let txType = MessageContent.Meta.Header.App;
		if(txType == 0){
			let input = curDetail.MessageContent.Inputs
				.map(el => {
					return {
						inAddr: el.Body.Address
					};
				});
			let output = curDetail.MessageContent.Meta.Outputs
				.map(el => {
					return {
						outAddr: el.Address
					}
				});
			let detailData = {
					TimeStamp: new Date(curDetail.TimeStamp * 1000).toLocaleString(),
					MessageKey: curDetail.MessageKey,
					type: '普通交易',
					input: input,
					output: output
				}
			let tx_detail_template = $('#tx_detail_template').html();
			let txDetailHtml = EJS.render(tx_detail_template, detailData);
			$('.tx-detail-table').html(txDetailHtml);
			$('.trading-details-modal').modal('toggle');
		} else{
			$('#warnModal').modal('toggle');
			$('#warnModal .btn-footer').addClass('none');
			$('#warnTxt').text('该交易类型查看详情功能暂未开放！')
		}
	})
}
let assetBindEvent = () => {
	$('.assert-add-table').on('click', '.copy-addr', function(){
		clipboard.writeText($(this).attr('data-addr'));
		$('.reminder').removeClass('none')
		setTimeout(function(){
			$('.reminder').addClass('none')
		}, 2000)
	})
	$('.assets-c-style').on('click', '.switch', function(){
		showAddress(initAddrId++);
	})
	$('.remaining-r').on('click', '.copy', function(){
		clipboard.writeText($(this).attr('data-addr'));
		$('.reminder').removeClass('none')
		setTimeout(function(){
			$('.reminder').addClass('none')
		}, 2000)
	})
	$('.account-info').on('click', function(){
		getAddrList();
	})
	
}

let assetInit = () => {
	getAddrList();	//地址列表
	assetsGetHistory();	// 最近交易
	getNewAddress();		//添加新地址 
	showTxDetails(); // 交易详情
	assetBindEvent();		//事件处理
}
assetInit();
module.exports = {
    getAddrList,
    assetsGetHistory
}