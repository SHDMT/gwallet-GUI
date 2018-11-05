let path = require('path')
let spawn = require('child_process').spawn;
let startGravity = () => {
    return new Promise((resolve, reject) => {
        let exe_parm = '../gravity';
        let exe_PATH = path.resolve(__dirname, exe_parm);

        let startGravityResult=spawn(exe_PATH,{shell:true});
        startGravityResult.stdout.on('data', (data) => {
            //console.log(`gravity start success: ${data}`);
             console.log("gravity start success")
            resolve(data);
        });
        startGravityResult.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
            reject(data);
        });
        config.set('startGravityPid',startGravityResult.pid)
    })
}

module.exports = {
    startGravity,
};