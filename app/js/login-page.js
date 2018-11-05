const regDBData = require("../js/data/register");
const loginDBData = require("../js/data/login");
const gravityData = require("../js/data/gravitydata");
const clipboard = require('electron').clipboard;
const ISNEWUSER = require("../js/public/isnewuser");
const walletDB = require('../../db/gwallet-db.js');
const {ipcRenderer} = require('electron');
const config = require('electron-json-config');
let seed, seedSure;
//获取种子
let getSeed = () => {
	regDBData.getSeed()
	.then(res =>{
		if(res.errorCode == 0){
			seed = res.data.replace('[','').replace(']','');
			$('#seed').text(seed);
		}
	})
	.catch(err => {
		$('#errorModal').modal('toggle');
		$('#errorTxt').text(err);
	})
}
//验证种子
let validateSeed = (args) => {
	regDBData.validateSeed(args)
	.then(res => {
		if(res.errorCode == 0 && res.data == 'true'){
			$('.container').addClass('none');
			$('#register').removeClass('none');
		} else{
			throw '种子验证失败'
		}
	})
	.catch(err => {
		$('#errorModal').modal('toggle');
		$('#errorTxt').text(err);
	})
}
//设置密码
let recoverWallet = (args) => {
	regDBData.recoverWallet(args)
	.then(res => {
		if(res.errorCode == 0 && res.data){
			let normalAddr = res.data;
			//设置密码成功，保存返回的地址到
			walletDB.db.serialize(function() {
			    walletDB.db.run("INSERT INTO ADDRESS(address) VALUES (?)", normalAddr, (err, res) => {
			        if(err == null){
			        		$('.container').addClass('none');
						$('#login').removeClass('none');
			        } else{
			        		throw '账户钱包地址保存失败';
			        }
			    });
			});
		}
	})
	.catch(err => {
		$('#errorModal').modal('toggle');
		$('#errorTxt').text(err);
	})
}
//登录
let startWallet = (args) => {
    loginDBData.startWallet(args)
	.then(res => {
		if(res){
			sessionStorage.setItem('accName', 'default');
			window.location.href = "index.html";
        		ipcRenderer.send('window-size');
		} else{
			throw '登录失败，请重新登录'
		}
	})
	.catch(err => {
		$('#errorModal').modal('toggle');
		$('#errorTxt').text(err);
	})
	
}
//事件绑定
let bindEvent = () => {
	$('body').bind("input propertychange", function () {
        $('.warning-bottom span').html('&nbsp');
    });
	$('.login-steps').on('click', function(){
		$('.container').addClass('none');
		let nextPage = $(this).attr('data-show');
		$('#'+nextPage).removeClass('none');
	})
	$('#crewallet').on('click', function(){
		getSeed();
	})
	$('#copy').on('click', function(){
		clipboard.writeText(seed);
		$('.reminder').removeClass('none')
		setTimeout(function(){
			$('.reminder').addClass('none')
		}, 2000)
	})
	$('.go-sure-seed').on('click', function(){
		seedSure = seed.split(' ');
		let seedInput = '<input class="seed-sure-input" />'
		 seedSure[3] = seedInput;
//		 seedSure[7] = seedInput;
//		 seedSure[11] = seedInput;
//		 seedSure[15] = seedInput;
//		 seedSure[21] = seedInput;
//		 seedSure[26] = seedInput;
		$('.sure-seed-text').html(seedSure.join(' '));
	});
	$('.go-reg').on('click', function(){
		 seedSure[3] = $('.seed-sure-input').eq(0).val().trim();
//		 seedSure[7] = $('.seed-sure-input').eq(1).val();
//		 seedSure[11] = $('.seed-sure-input').eq(2).val();
//		 seedSure[15] = $('.seed-sure-input').eq(3).val();
//		 seedSure[21] = $('.seed-sure-input').eq(4).val();
//		 seedSure[26] = $('.seed-sure-input').eq(5).val();
		let argSeed = seedSure.join(',');
		let seedData = {
			inputSeed: argSeed
		};
		validateSeed(seedData);
	});
    $('#login-input').keydown(function(e){
        e = e || event;
        var x = e.key;
        if (x == 'Enter') {
            login()
        }
    });
	$('.go-login').on('click', function(){
		// 输入的两次密码
        let pwd = $('#btn-sure').val();
        let pwdSure = $('#sure-twice').val();
        if (pwd == '') {
            $('#setpwd-wrong').text('提示：请输入正确的密码！')
            return;
        }
        if (pwdSure == '') {
            $('#setpwd-wrong').text('提示：请再次输入正确的密码！')
            return;
        }
        if (pwd !== pwdSure) {
           $('#setpwd-wrong').text('提示：两次输入的密码不一致！')
            return;
        } else {
        		//将密码插入password表
        		walletDB.db.serialize(function() {
			    walletDB.db.run("INSERT INTO PASSWORD(passWord) VALUES (?)", createDataHash(pwdSure), (err, res) => {
			        if(err !== null){
			        		$('#setpwd-wrong').text('提示：密码数据保存失败！')
			        		return;
			        }
			    });
			});
        	  	let recoverArg = {
          	  	password: pwdSure,
    				inputSeed: seedSure.join(',')
        	  	}
            recoverWallet(recoverArg);
        }
	})

	$('#go-index').on('click', login)

	$('.found-wallet').on('click', function(){
		$('#register').addClass('from-found-wallet');
		seedSure = $('.seed-found').val().split(' ');
		if(seedSure.length !== 33){
			$('#input-seed .password-warning').text('提示：请输入正确的钱包种子！')
			return;
		} else{
			$('.container').addClass('none');
			$('#register').removeClass('none');
		}
	})
	$('.go-seed-page').on('click', function(){
		if($('#register').hasClass('from-found-wallet')){
			$('.container').addClass('none');
			$('#input-seed').removeClass('none');
		} else{
			$('.container').addClass('none');
			$('#sure-seed').removeClass('none');
		}
	})
};

function login(){
    // 输入的两次密码
    let pwd = $('#login-input').val();
    if (pwd == '') {
        $('#login-wrong').text('提示：请输入正确的密码！')
        return;
    }
    //查找password表密码是否正确
    walletDB.db.serialize(function() {
        walletDB.db.get("select * from PASSWORD", (err, res) => {
            if(err !== null){
            		$('#login-wrong').text('提示：密码校验失败，请重新输入！');
            }
            if(res && res.passWord){
                if(res.passWord == createDataHash(pwd)){
                    let startData = {
                        password: pwd
                    }
                    sessionStorage.setItem('pwdHash', res.passWord);
                    startWallet(startData);
                } else{
                    $('#login-wrong').text('提示：请输入正确的密码！');
                }
            }
        });
    });
}

let startGravity = () => {
    gravityData.startGravity()
        .then(res => {
            //成功如何处理
            //ipcRenderer.send("close")
			console.log("Start gravity successful")
        })
        .catch(err => {
            //出错如何处理
            //ipcRenderer.send("close")
            console.log("failed to start gravity")
        })
};

//页面初始化
let loginInit = () => {
	bindEvent();
	//	loading加载
	$('.loading').animate({'width':'33%'},500); 
	$('.loading').animate({'width':'55%'},500); 
	$('.loading').animate({'width':'80%'},500); 
	$('.loading').animate({'width':'100%'},500); 
	ISNEWUSER.isNewUser();
	if(sessionStorage.getItem('isNewUser') == 1){
		//老用户
		setTimeout(function(){
			$('.container').addClass('none');
			$('#login').removeClass('none');
    			$('#login-input').focus();
		}, 2000)
	} else{
		//新用户
		setTimeout(function(){
			$('#home-page').addClass('none');
			$('#language').removeClass('none');
		}, 2000)
	}
	//启动Gravity
    startGravity()
};
loginInit();
	
