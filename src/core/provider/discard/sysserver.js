let exec = require('child_process').exec;
let shell = require('electron').shell;

class SysServer{
    constructor() {
    }

    process(req, res){
        let proc = req.process;
        exec(proc, (err, stdout, stderr) => {
            if (err) {
                response("exec", err, res);
            } else {
                try {
                    response("exec", stdout, res);
                } catch (err) {
                    console.log("Run proc error:", stderr);
                    response("exec", stderr, res);
                }
            }
        });
    }

    browseURL(req, res){
        let url = req.url;
        shell.openExternal(url);
    }
}

exports.SysServer = SysServer;