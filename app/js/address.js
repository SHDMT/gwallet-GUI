let addressCount;
let showMyAddrList = () => {
	//查找地址表，获取地址列表
	walletDB.db.serialize(function() {
	    walletDB.db.all("select rowid,* from ADDRESS", (err, res) => {
	        if(err !== null){
	        		console.log('查找地址表，获取地址列表失败')
	        } else{
	        		addressCount = res.length;
	        		let addr_lists_template = $('#addr_lists_template').html();
		        let data = {
						myAddrList: res.map(cur => {
							return {
								address: cur.address,
								description: cur.description,
								id: cur.rowid
							}
						})
					}
		        // 生成html模版
			    let htmlAddrList = EJS.render(addr_lists_template, data);
				$('#my-address tbody').html(htmlAddrList);
	        }
	    });
	});
}
let showMyFriendList = () => {
    //查找通讯录表，获取好友列表
    walletDB.db.serialize(function() {
        walletDB.db.all("select rowid,* from CONTACTS", (err, res) => {
            if(err !== null){
                console.log('查找通讯录表，获取好友列表失败')
            } else{
                let friend_lists_template = $('#friend_lists_template').html();
                let data = {
                    myFriendList: res.map(cur => {
                        return {
                            address: cur.address,
                            name: cur.name,
                            id: cur.rowid
                        }
                    })
                }
                // 生成html模版
                let htmlFriendList = EJS.render(friend_lists_template, data);
                $('#address-book tbody').html(htmlFriendList);
            }
        });
    });
}
let updateAddr = () => {
	//修改地址
    $('#address-section').on('click', '#my-address .addr-updata', function () {
        let rowId = $(this).attr('data-id');
        $('#address-modal').modal('toggle');
        $('#address-modal .address-title').text('修改地址');
        $('#address-modal #addr-input').val($(this).attr('data-addr'));
		$('#address-modal #msg-input').val($(this).attr('data-des'));
        $('#address-modal').off('click').on('click', '#btn-succ', function () {
            let msgUpdate = $('#msg-input').val();
            walletDB.db.serialize(function () {
                walletDB.db.run("UPDATE ADDRESS SET description = $des  WHERE rowid = " + rowId, {$des: msgUpdate}, (err, res) => {
                    console.log("修改地址表信息", err, res);
                    if (err == null) {
                        $('#address-modal').modal('toggle');
                        $('#successModal').modal('toggle');
                        $('#succeTxt').text('地址信息修改成功');
                        $('#successModal').off().on('hidden.bs.modal', () => {
                        		$('body').removeClass('modal-open');
							$('.modal-backdrop').remove();
                            showMyAddrList();
                        });
                    }
                });
            });
        })
    })
}
let delAddr = () => {
	//删除地址
    $('#address-section').on('click', '#my-address .addr-delete', function () {
    		if(addressCount == 1){
    			$('#warnModal').modal('toggle');
    			$('#warnModal .modal-footer').addClass('none');
        		$('#warnTxt').text('每个账户至少保留一个地址！');
    		} else{
    			let rowId = $(this).attr('data-id');
                $('#warnModal').modal('toggle');
                $('#warnTxt').text('您确定要删除该地址？');
                $('#warnModal .modal-footer').removeClass('none');
                $('#warnModal').off('click').on('click', '#del-addr-sure', function () {
	            walletDB.db.serialize(function () {
	                walletDB.db.run("DELETE FROM ADDRESS WHERE rowid = " + rowId, (err, res) => {
	                    console.log("删除地址", err, res);
	                    if (err == null) {
	                        //释放删除数据占用的内存
	                        walletDB.db.exec("VACUUM")
	                        $('#warnModal').modal('toggle');
	                        $('#successModal').modal('toggle');
	                        $('#succeTxt').text('删除地址成功');
	                        $('#successModal').off().on('hidden.bs.modal', () => {
	                            showMyAddrList();
	                            $('body').removeClass('modal-open');
								$('.modal-backdrop').remove();
	                        });
	                    }
	                });
	            });
	        })
    		}
    })
}
let addAddrFun = () => {
	//添加地址
    $('#my-address').off().on('click', '.addr-add', function () {
        let param = {
            accountName: sessionStorage.getItem('accName')
        }
        gWalletData.getNewAddress(param)
            .then(res => {
            		// 如果没有找到子字符串，则返回 -1。
                if (res.errorCode == 0 && res.data.indexOf('more than 20') == -1 && format.isBase64(res.data)) {
                    let newAddrData = res.data;
                    $('#msg-input').val('');
                    $('#address-modal').modal('toggle');
                    $('#address-modal .address-title').text('添加地址')
                    $('#address-modal #addr-input').val(newAddrData);
                    $('#address-modal').off('click').on('click', '#btn-succ', function () {
                        let desAdd = $('#msg-input').val();
                        //添加地址后插入到地址表中
                        walletDB.db.serialize(function () {
                            walletDB.db.run("INSERT INTO ADDRESS(address, description) VALUES (?,?)", [newAddrData, desAdd], (err, res) => {
                                console.log("添加地址后插入到地址表中", err, res);
                                if (err == null) {
                                    $('#address-modal').modal('toggle');
                                    $('#successModal').modal('toggle');
                                    $('#succeTxt').text('添加地址成功');
                                    $('#successModal').one('hidden.bs.modal', () => {
                                        showMyAddrList();
                                        $('body').removeClass('modal-open');
										$('.modal-backdrop').remove();
                                    });
                                }
                            });
                        });
                    })
                }
                if(res.data.indexOf('more than 20') != -1){
                		throw '未使用的地址不能超过20个';
                }
            })
            .catch(err => {
                $('#errorModal').modal('toggle');
				$('#errorTxt').text(err);
            })
    })
}
//添加通讯录
let addContact = () => {
	$('#address-book').off().on('click', '.friend-add', function () {
		$('#friend-input').val('');
		$('#friend-msg-input').val('');
        $('#friend-modal').modal('toggle');
        $('#friend-modal .friend-title').text('添加联系人');
        $('#friend-modal').off().on('click', '#btn-succ', function(){
	        let firendAddr = $('#friend-input').val().trim();
	        let friendMsg = $('#friend-msg-input').val();
	        //验证地址
	        if (firendAddr.trim().length==0){
                $('.addresswarning-info').text('提示：好友地址不能为空');
            }else if(!format.isBase64(firendAddr.trim())){
                $('.addresswarning-info').text('提示：好友地址格式不正确');
            }else {
                //添加数据到联系人表
                walletDB.db.serialize(function () {
                    walletDB.db.run("INSERT INTO CONTACTS(address, name) VALUES (?,?)", [firendAddr, friendMsg], (err, res) => {
                        console.log("添加联系人", err, res);
                        if (err == null) {
                            $('#friend-modal').modal('toggle');
                            $('#successModal').modal('toggle');
                            $('#succeTxt').text('添加联系人成功');
                            $('#successModal').one('hidden.bs.modal', () => {
                                $('body').removeClass('modal-open');
                                $('.modal-backdrop').remove();
                                showMyFriendList();
                            });
                        }else{
                            console.log("ininininin:", err)
                            $('.addresswarning-info').text('添加联系人错误：'+ err);
                        }
                    });
                });
            }
        })
    })
}
//修改通讯录
let updateContact = () => {
	$('.address-list').off().on('click', '.friend-updata', function () {
		let elm = $(this);
		//输入钱包密码
		// $('.pwd-style').val('');
		// $('#tradingPwdModal').modal('toggle');
		// 监听关闭密码输入窗口
    		// $('#tradingPwdModal').on('click', '#tx-pwd-sure', function(){
    		// 	//读取数据库交易密码是否输入正确
    		// 	let txPwd = $('.pwd-style').val();
    		// 	let pwdHash = sessionStorage.getItem('pwdHash')
    		// 	if(createDataHash(txPwd) == pwdHash){
    				// $('#ipt-wrong').text('');
    				// $('#tradingPwdModal').modal('toggle');
    				//进入修改联系人信息弹窗
    		updateContactPass(elm);
    		// 	} else{
    		// 		//密码输入错误，请重新输入
    		// 		$('#ipt-wrong').text('提示：密码输入错误，请重新输入');
    		// 	}
    			
    		// })
		
    })
}
let updateContactPass = (elm) => {
	let rowId = elm.attr('data-id');
    $('#friend-modal').modal('toggle');
    $('#friend-modal .friend-title').text('修改通讯录')
    $('#friend-modal #friend-input').val(elm.attr('data-addr'));
	$('#friend-modal #friend-msg-input').val(elm.attr('data-name'));
    $('#friend-modal').off('click').on('click', '#btn-succ', function () {
    	let addrUpdate = $('#friend-input').val();
        let msgUpdate = $('#friend-msg-input').val();
        walletDB.db.serialize(function () {
            walletDB.db.run("UPDATE CONTACTS SET name = $name, address = $addr WHERE rowid = " + rowId, {$name: msgUpdate, $addr: addrUpdate}, (err, res) => {
                console.log("修改通讯录表信息", err, res);
                if (err == null) {
                    $('#friend-modal').modal('toggle');
                    $('#friend-msg-input').val('');
                    $('#successModal').modal('toggle');
                    $('#succeTxt').text('联系人信息修改成功');
                    $('#successModal').one('hidden.bs.modal', () => {
                        showMyFriendList();
                        $('body').removeClass('modal-open');
						$('.modal-backdrop').remove();
                    });
                }
            });
        });
    })
}
//删除通讯录
let delContact = () => {
	$('.address-list').on('click', '.friend-delete', function () {
        let rowId = $(this).attr('data-id');
        //输入钱包密码
        // $('.pwd-style').val('');
        // $('#tradingPwdModal').modal('toggle');
        // 监听关闭密码输入窗口
        // $('#tradingPwdModal').on('click', '#tx-pwd-sure', function() {

        //     let txPwd = $('.pwd-style').val();
    	// 	let pwdHash = sessionStorage.getItem('pwdHash')
    	// 	if(createDataHash(txPwd) == pwdHash){
    			$('#ipt-wrong').text('');
                // $('#tradingPwdModal').modal('hide');
                //进入修改联系人信息弹窗
                $('#warnModal').modal('show');
                $('#warnTxt').text('您确定要删除该联系人？');
                $('#warnModal .modal-footer').removeClass('none');
                $('#warnModal').off('click').on('click', '#del-addr-sure', function () {
                    walletDB.db.serialize(function () {
                        walletDB.db.run("DELETE FROM CONTACTS WHERE rowid = " + rowId, (err, res) => {
                            if (err == null) {
                                //释放删除数据占用的内存
                                walletDB.db.exec("VACUUM")
                                $('#warnModal').modal('hide');
                                $('#successModal').modal('toggle');
                                $('#succeTxt').text('删除联系人成功');
                                $('#successModal').one('hidden.bs.modal', () => {
                                    $('body').removeClass('modal-open');
                                    $('.modal-backdrop').remove();
                                    showMyFriendList();
                                });
                            }
                        });
                    });
                })
    		// } else{
    		// 	//密码输入错误，请重新输入
    		// 	$('#ipt-wrong').text('提示：密码输入错误，请重新输入');
            // }   
        // })
    })
}
let addrBindEvent = () => {
    $('.address-nav-r li a').on('click', function () {
        let pageTitle = $(this).text();
        $('.address-nav-l>span').text(pageTitle);
        sessionStorage.setItem('selectedLi', $(this).attr('aria-controls'))
    })
    $('body').on('click', '#address-modal .g-close', function (e) {
        e.stopPropagation();
        $('#address-modal').modal('toggle');
        $('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
    })
    $('body').on('click', '#friend-modal .g-close', function (e) {
        e.stopPropagation();
        $('#friend-modal').modal('toggle');
        $('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
    })
    $('body').on('click', '#warnModal .close-modal', function (e) {
        e.stopPropagation();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('#warnModal').modal('hide');
    })
    $('body').on('click', '#successModal .g-close', function (e) {
        e.stopPropagation();
        $('#successModal').modal('toggle');
        $('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
    })

    $('.address-friend-modal-close').on('click', ()=>{
        $("#friend-modal").modal("toggle");
    });

    $('.address-address-modal-close').on('click', ()=>{
        $("#address-modal").modal("toggle");
    });
}

let addressInit = () => {
	showMyAddrList();	//我的地址列表获取
    showMyFriendList();	//我的好友列表获取
    updateAddr();
    delAddr();
    addAddrFun();
    addContact();
    updateContact();
    delContact();
	addrBindEvent();		//事件处理
}
addressInit();
module.exports = {
    showMyAddrList,
    showMyFriendList
}