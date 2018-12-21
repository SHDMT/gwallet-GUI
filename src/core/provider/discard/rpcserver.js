let GRPCClient = require('../drive/grpc').GRPCClient;
let response = require('../response');

class RPCServer{
    constructor() {
        this.rpcdrive = new GRPCClient();
    }

    connect(protoPath, host, port){
        this.rpcdrive.connect(protoPath, host, port);
    }

    disconnect(){
       this.rpcdrive.disconnect();
    }

    getinfo(req, res){
        this.rpcdrive.getClient().getinfo(req, (err, msg) =>{
            response(res, "getinfo", err, msg);
        })
    }
/* 
    cmd:getbalance
    req:{
        account: default,
        asset: xxxcoin
    }
    res:{
        balance: xxx,
    }
*/
    getBalance(req, res){
        this.rpcdrive.getClient().getBalance(req, (err, msg)=>{
            response(res, "getbalance", err, msg);
        });
    }
}

exports.RPCServer = RPCServer;