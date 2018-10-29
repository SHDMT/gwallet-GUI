const os=require("os")
const fs=require("fs")
const path = require('path');
const QRCode = require('qrcode');
const crypto = require('crypto');
/*
	输入不固定个数参数，按固定格式输出结果
 */
function cliArgs(strings, ...keys) {
    var result = [];
    keys.forEach(function (key,index) {
        var value=(key==null||key=='') ? null:strings[index]+key;
        result.push(value);
    })
    return result.join('');
}


/**
 * 乘法 a*b
 * @param {Object} a
 * @param {Object} b
 */
let Fmul = (a, b)  => {
	var c = 0,
		d = a.toString(),
		e = b.toString();
	try {
		c += d.split(".")[1].length;
	} catch(f) {}
	try {
		c += e.split(".")[1].length;
	} catch(f) {}
	return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
/**
 * 将数值截取后2位小数,格式化成金额形式
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
let formatCurrency = (num) => {
	num += ''
	num = num.toString().replace(/\$|\,/g, '');
	if(isNaN(num))
		num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(Fmul(num, 100));
	cents = num % 100;
	num = Math.floor(num / 100).toString();
	if(cents < 10)
		cents = "0" + cents;
	for(var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
		num = num.substring(0, num.length - (4 * i + 3)) + ',' +
		num.substring(num.length - (4 * i + 3));
	return(((sign) ? '' : '-') + num + '.' + cents);
}
/*
    交易类型
*/
const TXTYPE = new Map()
    .set('PaymentMessage', '普通交易')
    .set('TextMessage', '文本交易')

/**
 *map转化为对象（map所有键都是字符串，可以将其转换为对象）
 */
let strMapToObj = (strMap) =>{
    let obj= Object.create(null);
    for (let[k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

/**
 *对象转换为Map
 */
let objToStrMap = (obj) =>{
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k,obj[k]);
    }
    return strMap;
}

/**
 *json转换为map
 */
let jsonToMap = (jsonStr) =>{
    return  JsonUtils.objToStrMap(JSON.parse(jsonStr));
}

/**
 *map转换为json
 */
let mapToJson = (map) =>{
    return JSON.stringify(JsonUtils.strMapToObj(map));
}
/* 
   生成二维码的方法
*/
let createQRCode = (_element, _str, _width) => {
	QRCode.toCanvas(_element, _str, {
		errorCorrectionLevel: 'L',
		width: _width
	}, (error) => {
		if (error) console.error(error);
	})
}
/* 
    生成信息的hash值，用于比较信息是否一致
*/
let createDataHash = (obj) => {
	return crypto.createHash('sha256').update(JSON.stringify(obj), 'utf8').digest('base64');
}

//使用时第二个参数可以忽略
function mkdir(dirpath,dirname){
    //判断是否是第一次调用
    if(typeof dirname === "undefined"){
        if(fs.existsSync(dirpath)){
            return;
        }else{
            mkdir(dirpath,path.dirname(dirpath));
        }
    }else{
        //判断第二个参数是否正常，避免调用时传入错误参数
        if(dirname !== path.dirname(dirpath)){
            mkdir(dirpath);
            return;
        }
        if(fs.existsSync(dirname)){
            fs.mkdirSync(dirpath)
        }else{
            mkdir(dirname,path.dirname(dirname));
            fs.mkdirSync(dirpath);
        }
    }
}

function dataPath(...args){
    if (os.platform() == "win32") {
        // Windows XP and before didn't have a LOCALAPPDATA, so fallback
        // to regular APPDATA when LOCALAPPDATA is not set.
        if (fs.existsSync(path.join(os.homedir(),"LOCALAPPDATA"))){
            return path.join(os.homedir(),"LOCALAPPDATA","gwallet",...args);
        }
//      }else if (fs.existsSync(path.join(os.homedir(),"APPDATA"))){
//          return path.join(os.homedir(), "APPDATA", "gwallet","data");
//      }
        return path.join(os.homedir(), "AppData", "Local", "gwallet",...args);
    } else if (process.platform=== "darwin") {
        return path.join(os.homedir(), "Library","Application Support","gwallet",...args);
    } else if (process.platform=== "linux") {
        return path.join(os.homedir(),"gwallet",...args);
    }else {
        return path.join(os.homedir(),".","gwallet",...args);
    }
}
//格式化json数据展示到页面中
let formatJson = (msg) => {
        let rep = "~";
        let jsonStr = JSON.stringify(msg, null, rep)
        let str = "";
        for (let i = 0; i < jsonStr.length; i++) {
            let text2 = jsonStr.charAt(i)
            if (i > 1) {
                let text = jsonStr.charAt(i - 1)
                if (rep != text && rep == text2) {
                    str += "<br/>"
                }
            }
            str += text2;
        }
        jsonStr = "";
        for (let i = 0; i < str.length; i++) {
            let text = str.charAt(i);
            if (rep == text)
                jsonStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            else {
                jsonStr += text;
            }
            if (i == str.length - 2)
                jsonStr += "<br/>"
        }
        return jsonStr;
    }

let addMark=(string)=>{
    if (os.platform() == "win32") {
        var string = string.replace(/\"/g, "\\\"");
        return string;
    }
    let stringWithMark="'"+string+"'";
    return stringWithMark;
}

let isBase64=(string)=>{
    let base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return base64regex.test(string);
}


module.exports = {
    TXTYPE,
    cliArgs,
    formatCurrency,
    strMapToObj,
    objToStrMap,
    jsonToMap,
    mapToJson,
    createQRCode,
    createDataHash,
    mkdir,
    dataPath,
    formatJson,
    addMark,
    isBase64
}
