/*
    获取块上信息
 */

const {
    ipcRenderer
} = require('electron');

//执行命令的结果
let command = (args) => {
    return new Promise((resolve, reject) => {
        command.command(args)
            .then((res) => {
                resolve(responseData.setResponse({
                    _data: res
                }));
            })
            .catch(err => {
                reject(responseData.setResponse({
                    _errorCode: 99,
                    _errorMessage: err
                }));
            });
    })
};
module.exports = {
    command,
}