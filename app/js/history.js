let txHistorysList;	//交易列表所有数据

let hisGetHistory = () => {
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
					details: txHistorysList.map(cur => {
						return {
							TimeStamp: new Date(cur.TimeStamp * 1000).toLocaleString(),
							MessageKey: cur.MessageKey
						}
					})
				};
				let tx_history_template = $('#tx_history_template').html();
			    let htmlTxHistory = EJS.render(tx_history_template, data);
			    $('#history-section .tx-history-table>tbody').html(htmlTxHistory);
			}
		})
		.catch(err => {
			console.log('getHistory==Error',err);
		})
}
let hisBindEvent = () => {
	$('#history-section').off('click').on('click', '.tx-details', function(){
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

let historyInit = () => {
	hisGetHistory();		// 交易记录
	hisBindEvent();		//事件处理
}
historyInit();
