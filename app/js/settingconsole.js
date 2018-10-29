/*
	控制台
 */
const commandData = require('../js/data/comman');

let commandSet = () => {
    let commandSetCallBack = () =>{
        let param = $('#command').val();
        commandData.command(param)
            .then(res => {
                let result=res.data.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                $('.bdcse-contain').html(result);
            })
            .catch(err => {
                console.log('控制台err', err);
                $('.bdcse-contain').html(err);
            })
    };
	$('.bdcse-btn').on('click',commandSetCallBack);
    $('#command').keydown(function(e){
        e = e || event;
        if (e.key == "Enter") {
            $('.bdcse-btn').css('color','red');
            commandSetCallBack();
            setTimeout(()=>{
                $('.bdcse-btn').css('color','#fff');
            },50)
        }
    });
}
let consoleBindEvent = () => {
	$('body').bind("input propertychange", function () {
        $('.bdcse-contain').html('&nbsp');
    });

}

let consoleInit = () => {
	commandSet();
	consoleBindEvent();
}
consoleInit();
