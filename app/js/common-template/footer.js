const {
	remote
} = require('electron');

const updateTime = 3000
const maxProgress = 100000000
let currentProgress = 0
let lastProgress = 0

//获取peer数量
let getPeers = () => {
	gravityData.getPeers()
		.then(res => {
			if (res.errorCode == 0 && res.data && res.data != 'null') {
				let peers = JSON.parse(res.data);
				if (peers.length >= 12) {
					$('.network-state span').addClass('active');
				} else if (peers.length >= 8) {
					$('.network-state span:lt(3)').addClass('active');
				} else if (peers.length >= 4) {
					$('.network-state span:lt(2)').addClass('active');
				} else {
					$('.network-state span:first').addClass('active');
				}
			}
		})
		.catch(err => {
			clearInterval(startPeers);
			console.log('getPeers==Error', err)
		})
}
//获取最新区块高度
let getCurrentHeight = () => {
	gravityData.getCurrentHeight()
		.then(res => {
			if (res.errorCode == 0 && res.data) {
				$('#block-height').text(res.data);
			}
		})
		.catch(err => {
			clearInterval(startHeight);
			console.log('getCurrentHeight==Error', err)
		})
}

//判断是否是委员会成员
let isCommittee = () => {
	gravityData.isCommittee()
		.then(res => {
			if (res.errorCode == 0 && res.data) {
				if (res.data == 'true') {
					$('#committee').text('YES');
				} else {
					$('#committee').text('NO');
				}
			}
		})
		.catch(err => {
			clearInterval(startCommittee);
			console.log('isCommittee==Error', err)
		})
}
//获取挖矿速度
let getMiningSpeed = () => {
	gravityData.getMiningSpeed()
		.then(res => {
			if (res.errorCode == 0 && res.data) {
				$('#mining').text(res.data + ' Hash/s');
			}
		})
		.catch(err => {
			clearInterval(startMiningSpeed);
			console.log('getMiningSpeed==Error', err)
		})
}
/* 
    导入用户头像
*/
let importUserPhoto = () => {
	remote.dialog.showOpenDialog({
		filters: [{
			name: 'Images',
			extensions: ['jpg', 'png', 'gif']
		}],
		properties: ['openFile'],
	}, (filePath) => {
		if (filePath !== undefined) {
			console.log('filePath', filePath);
			$('.select-user img').attr('src', filePath);
		}
	});
}
//生成新账户
let createNewAccount = (args) => {
	let accArgs = {
		accountName: args.accountName,
		acctType: args.acctType
	}
	gWalletData.createNewAccount(accArgs)
		.then(res => {
			console.log('createNewAccount===res', res);
			if (res.errorCode == 0 && res.data.length == 44) {
				//添加新账户到accountInfo表中
				walletDB.db.serialize(function () {
					walletDB.db.run("INSERT INTO ACCOUNTINFO(acctId, acctName, icon, type) VALUES (?,?,?,?)", [args.acctId, args.accountName, args.icon, args.acctType], (err, res) => {
						console.log("add new account into accountInfo table", err, res);
						if (err == null) {
							$('#add-users').modal('toggle');
							$('#successModal').modal('toggle');
							$('#succeTxt').text('添加账户成功');
							$('#successModal').off().one('hidden.bs.modal', () => {
								getAccList();
								$('body').removeClass('modal-open');
								$('.modal-backdrop').remove();
							});
						}
					});
				});
			}
		})
		.catch(err => {
			console.log('createNewAccount===Error', err)
		})
}
let getAccList = () => {
	//查找账户表
	walletDB.db.serialize(function () {
		walletDB.db.all("select * from ACCOUNTINFO", (err, res) => {
			if (err !== null) {
				console.log('Failed to get account list')
			} else {
				let user_list_template = $('#user_list_template').html();
				let accInfos;
				$('#all-user .add-box').html('');
				$('#tx-alluser .add-box').html('')
				res.forEach(item => {
					accInfos = {
						acctName: item.acctName,
						icon: item.icon
					}
					// 生成html模版
					let htmlNewAcc = EJS.render(user_list_template, { accInfos });
					$('#all-user .add-box').prepend(htmlNewAcc);
					$('#tx-alluser .add-box').prepend(htmlNewAcc);
				})
				showAccountAmount();
			}
		});
	});
}
let footerBindEvent = () => {
	$(document).bind('click', function (e) {
		e.stopPropagation();
		$('#all-user').fadeOut(400);
	});
	$('#user-default').click(function (e) {
		e.stopPropagation();
		$('#all-user').fadeIn(400);
	});
	$('.add-user').off('click').on('click', function () {
		$('#add-acc-wran').html('&nbsp;')
		$('#sure-twice').val('');
		$('.select-user>img').attr('src', '../img/user.png');
		$('#add-users').modal('toggle');
	})
	$('body').on('click', '#btn-succ', function () {
		let accName = $('#sure-twice').val();
		let accData = {
			acctId: Math.floor(Math.random() * 100 + 1),
			accountName: accName,
			acctType: $('.sele-account option:selected').val(),
			icon: $('.select-user img').attr('src')
		}
		//只含有汉字、数字、字母、下划线不能以下划线开头和结尾
		let accReg = /^^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{1,16}$/;
		//let accReg = /^[a-zA-Z]{4,16}$/;
		if (accName == '') {
			$('#add-acc-wran').text('提示：账户名称不能为空')
			return;
		}
		if (!accReg.test(accName)) {
			//$('#add-acc-wran').text('提示：账户名称格式输入错误')
			$('#add-acc-wran').text('提示：账户名称格式输入错误\b只含有汉字、数字、字母、下划线不能以下划线开头和结尾')
			return;
		}
		//查找账户表是否重名
		walletDB.db.serialize(function () {
			walletDB.db.all("select * from ACCOUNTINFO WHERE acctName = ?", [accName], (err, res) => {
				console.log("Is rename?", err, res);
				if (res.length != 0) {
					$('#add-acc-wran').text('提示：账户名称已存在！')
					return;
				} else {
					createNewAccount(accData);
				}
			});
		});
	});
	$('body').on('click', '.select-user img', function () {
		importUserPhoto();
	})
	//切换账号
	$('#all-user').on('click', '.user-list', function () {
		let index = $(this).index();
		sessionStorage.setItem('accIndex', index + 1);
		$('#all-user .user-list').removeClass('active');
		$('#tx-alluser .user-list').removeClass('active');
		$(this).addClass('active');
		$('#tx-alluser .user-list').eq(index).addClass('active');
		showSelectedAccount();
	})
	//交易页面切换账号
	$('#tx-alluser').on('click', '.user-list', function () {
		let index = $(this).index();
		sessionStorage.setItem('accIndex', index + 1);
		$('#all-user .user-list').removeClass('active');
		$('#tx-alluser .user-list').removeClass('active');
		$(this).addClass('active');
		$('#all-user .user-list').eq(index).addClass('active');
		showSelectedAccount();
	})
}
//显示当前选中的账户
let showSelectedAccount = () => {
	let selectedAccImg = $('#all-user .user-list.active img').attr('src');
	let selectedAccName = $('#all-user .user-list.active span').text();
	$('#user-default img').attr('src', selectedAccImg);
	$('#user-default span').html(selectedAccName);
	$('.tx-user-photo').attr('src', selectedAccImg);
	sessionStorage.setItem('accName', selectedAccName);
	showBalance(sessionStorage.getItem('accName'));
}
//显示当前选中账户资产
let showAccountAmount = () => {
	let accIndex = Number(sessionStorage.getItem('accIndex'));
	if (accIndex) {
		let accImg = $('#tx-alluser .add-box .user-list').eq(accIndex - 1).children('img').attr('src');
		$('#all-user .user-list').removeClass('active');
		$('#tx-alluser .user-list').removeClass('active');

		$('#all-user .user-list').eq(accIndex - 1).addClass('active');
		$('#user-default img').attr('src', accImg);
		$('#user-default span').html(sessionStorage.getItem('accName'));

		$('#tx-alluser .user-list').eq(accIndex - 1).addClass('active');
		$('.tx-user-photo').attr('src', accImg);
	}
}

function calculateRestTimeSeconds(){
	let incrementProgress = currentProgress - lastProgress
	let syncSpeed = incrementProgress / updateTime
	let workSum = maxProgress - currentProgress
	let restTimeSeconds = workSum / syncSpeed
	return restTimeSeconds
}
function formatRestTimeSeconds(s) { 
	if(s == Infinity || s == undefined){
		return "0/0";
	}
    let day = Math.floor( s/ (24*3600) );   // Math.floor()向下取整 
    let hour = Math.floor( (s - day*24*3600) / 3600); 
    let minute = Math.floor( (s - day*24*3600 - hour*3600) /60 ); 
	let second = s - day*24*3600 - hour*3600 - minute*60; 
	
	let data = "";
	let count = 0
	if(day > 0){
		data = data + day + "天";
		count++
	}
	if(hour > 0){
		data = data + hour + "小时";
		count++
	}
	if(minute > 0){
		data = data + minute + "分";
		count++
	}
	if(second > 0 && count == 0){
		return "1分"
	}
	if(count == 0){
		return "0/0";
	}
    return data; 
}

function updateRestTime(){
	// let seconds = calculateRestTimeSeconds();
	// let data = formatRestTimeSeconds(seconds);
	$('.unitsync-progress-resttime').text(parseInt(currentProgress / 10000) +"/"+ maxProgress / 10000);
}

function updateSyncProgress() {
	let value = currentProgress / maxProgress * 100
	$('.unitsync-progress-bar').animate({ 'width': value + '%' }, 500);
	$(".unitsync-progress-bar").attr("aria-valuenow", value)
	if(value == 100){
		$('.unitsync-progress-resttime').text("同步完成");
		return true;
	}else{
		return false;
	}
}

function bindSyncDetector(){
	setInterval(() => {
		gravityData.progress().then((res)=>{
			currentProgress = Number(res.data)
			if(!updateSyncProgress()){
				updateRestTime()
			}
			lastProgress = currentProgress
		}).catch((err)=>{
			console.log("Get sync progress error:", err)
		});
		
		
	}, updateTime)
}

//初始化
let footerInit = () => {
	footerBindEvent();	//事件绑定
	$('#dag-mci').text(sessionStorage.getItem('MCI'));
	getPeers(); //网络状态
	getCurrentHeight();	//区块高度
	isCommittee();	//委员会成员
	getMiningSpeed();	//挖矿速度
	getAccList();//获取账户列表
	//if (sessionStorage.getItem('MCI')) {
		setInterval(function () {
			$('#dag-mci').text(sessionStorage.getItem('MCI'));
		}, 3000)
	//}
	let startPeers = setInterval(function () {
		getPeers();
	}, 30000)
	let startHeight = setInterval(function () {
		getCurrentHeight();
	}, 30000)
	let startCommittee = setInterval(function () {
		isCommittee();
	}, 30000)
	let startMiningSpeed = setInterval(function () {
		getMiningSpeed();
	}, 30000)

	bindSyncDetector()
}
footerInit();

