/*
	挖矿设置
 */
let startMining = () => {
	let args = {
		num: 1,
	}
	gravityData.startMining(args)
	.then(res => {
		console.log('开始挖矿res', res);
		if(res.errorCode == 0 && res.data == 'true'){
			$('.mining-start').removeClass('mining-start').addClass('mining-end').text('停止');
			$('#successModal').modal('toggle');
			$('#succeTxt').text('已经开始挖矿');
		}
	})
	.catch(err => {
		console.log('开始挖矿err', err);
		$('#errorModal').modal('toggle');
		$('#errorTxt').text(err);
	})
}
let stopMining = () => {
	gravityData.stopMining()
	.then(res => {
		console.log('关闭挖矿res', res);
		if(res.errorCode == 0 && res.data == 'true'){
			$('.mining-end').removeClass('mining-end').addClass('mining-start').text('开始');
			$('#successModal').modal('toggle');
			$('#succeTxt').text('已经关闭挖矿');
		}
	})
	.catch(err => {
		console.log('关闭挖矿err', err);
		$('#errorModal').modal('toggle');
		$('#errorTxt').text(err);
	})
}
let miningBindEvent = () => {
	$('.mining-con').on('click', '.mining-start', function(){
		startMining();	//开始挖矿
	})
	$('.mining-con').on('click', '.mining-end', function(){
		stopMining();	//停止挖矿
	})
	$('body').on('click', '#successModal .g-close', function (e) {
        e.stopPropagation();
        $('#successModal').modal('toggle');
        $('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
    })
}

let miningInit = () => {
	miningBindEvent();
}
miningInit();
