const gWalletData = require('../js/data/gwalletdata');
const gravityData = require('../js/data/gravitydata');
const EJS = require('ejs');
const clipboard = require('electron').clipboard;
const walletDB = require('../../db/gwallet-db.js');

let showBalance = (args) => {
	let param = {
		accountName: args
	}
	gWalletData.getBalance(param)
		.then(res => {
			if(res.errorCode == 0){
				let assets = JSON.parse(res.data)[0].balanceAsset[0];
				let asset_total = formatCurrency(assets.assetTotal);	//账户余额
				let asset_spendable = formatCurrency(assets.assetSpendable);	//可用余额
				$('.asset-total .f28').html(asset_total.split('.')[0] + '.');
				$('.asset-total .f12').html(asset_total.split('.')[1] + ' N');
				$('.asset-spendable').attr('data-amount', assets.asset_spendable);
				$('.asset-spendable .f28').html(asset_spendable.split('.')[0] + '.');
				$('.asset-spendable .f12').html(asset_spendable.split('.')[1] + ' N');
			}
		})
		.catch(err => {
			console.log('getBalance', err)
		})
}
//获取最新main chain index
let getCurrentMCI = () => {
	gravityData.getCurrentMCI()
	.then(res => {
		sessionStorage.setItem('MCI', 0)
		if(res.errorCode == 0 && res.data){
			sessionStorage.setItem('MCI', Number(res.data))
		}
	})
	.catch(err => {
		console.log('getCurrentMCI', err)
		clearInterval(startMCI);
	})
}

//点击tab刷新
let indexBindEvent = () => {
	$('#button-assets').on('click', function(){
		getAddrList();
    		assetsGetHistory();
	})
	$('#button-transaction').on('click', function(){
		showContactList();
	})
	$('#button-history').on('click', function(){
		historyInit();
	})
	$('#button-address').on('click', function(){
		showMyAddrList();
    		showMyFriendList();
	})
}
indexBindEvent();
//input 改变后清除错误提示
let clearWarning = () => {
	$('body').bind("input propertychange", function () {
        $('.warning-bottom span').html('&nbsp');
    });
}
let indexInit = () => {
	setInterval(function(){
		showBalance(sessionStorage.getItem('accName'));	// 资产展示
	}, 3000)
	let startMCI = setInterval(function(){
		getCurrentMCI();		//MCI
	}, 3000)
	getCurrentMCI();
	showBalance(sessionStorage.getItem('accName'));	// 资产展示
	clearWarning();
}
indexInit();
module.exports = {
    showBalance
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';