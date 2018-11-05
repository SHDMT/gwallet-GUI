/*
	安全设置
 */
let secuBindEvent = () => {
	$('#fix-pwd').on('click', function(){
		$('#chan-passwordModal').modal('toggle');
	})
	$('#rescan-renew').on('click', function(){
		$('#rescan-modal').modal('toggle');
		
	})
	$('body').bind("input propertychange", function () {
        $('.warning-btn1 span').html('&nbsp');
    });
}
let fixedPWD = () => {
	$('#chg-pwd-sure').on('click', function(){
		console.log(222222222)
		let oldPwd = $('.ori-pwd input').val();
		let newPwd = $('.new-pwd input').val();
		let newPwdSure = $('.sur-pwd input').val();
		let pwdHash = sessionStorage.getItem('pwdHash');
		if(!oldPwd || createDataHash(oldPwd) != pwdHash){
			$('#chan-passwordModal #fixpwd-wrong').text('提示：原密码输入错误！');
			return;
		} 
		if(!newPwd){
			$('#chan-passwordModal #fixpwd-wrong').text('提示：新密码不能为空！');
			return;
		}
		if(newPwd === oldPwd){
			$('#chan-passwordModal #fixpwd-wrong').text('提示：新密码与原密码不能一致！');
			return;
		}
		if(!newPwdSure){
			$('#chan-passwordModal #fixpwd-wrong').text('提示：确认密码不能为空！');
			return;
		}
		if(newPwd != newPwdSure){
			$('#chan-passwordModal #fixpwd-wrong').text('提示：确认密码与新密码不一致！');
			return;
		}
		let param = {
			oldPassword: oldPwd,
			newPassword: newPwdSure
		}
		gWalletData.updatePassword(param)
			.then(res => {
				console.log('updatePassword', res, param);
				if(res.errorCode == 0 && res.data == 'true'){
					//更新password表密码
			    		walletDB.db.serialize(function() {
					    walletDB.db.get("update PASSWORD SET passWord = ? WHERE rowid = ?", [ createDataHash(newPwdSure), 1 ], (err, res) => {
					        if(err == null){
					        		sessionStorage.setItem('pwdHash', createDataHash(newPwdSure));
					        		$('#chan-passwordModal').modal('toggle');
					        		$('.warning-btn1 span').html('&nbsp');
					        		$('#successModal').modal('toggle');
								$('#succeTxt').text('密码修改成功，即将跳转到登录页面');
								setTimeout(function(){
									$('#successModal').modal('toggle');
									//退出app
			//		        			location.replace('../views/login.html');
								}, 1500)
					        } else{
					        		throw '密码修改失败！'
					        }
					    });
					});
				} else{
					throw '密码修改失败！'
				}
			})
			.catch(err => {
				console.log(err)
				$('#chan-passwordModal #fixpwd-wrong').text('提示：' + err);
			})
	})
}

let secuSettingsInit = () => {
	secuBindEvent();
	fixedPWD();		//修改密码
}
secuSettingsInit();
