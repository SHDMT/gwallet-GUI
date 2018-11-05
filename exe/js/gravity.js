let path = require('path')
let spawn = require('child_process').spawn;
let startGravity = () => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity';
        let exe_PATH = path.resolve(__dirname, exe_parm);

        let startGravityResult=spawn(exe_PATH,{shell:true});
        startGravityResult.stdout.on('data', (data) => {
            //TODO
            //console.log("Gravity启动成功！！")
        });
        startGravityResult.stderr.on('data', (data) => {
            //TODO
            //console.log("Gravity启动失败！！")
            console.log(`stderr: ${data}`);
            reject(data);
        });
        config.set('startGravityPid',startGravityResult.pid)
    })
}

module.exports = {
    startGravity,
};