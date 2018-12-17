const {
    ipcRenderer
} = window.require('electron');

function request(topic, params){ 
    try{
        ipcRenderer.send(topic, params); 
    }catch(error){
        console.log(error);
    }
}

function requestWithResponse(topic, params = null, callback){
    try{
        ipcRenderer.send(topic, params); 
        ipcRenderer.once("[res]" + topic, (event, res)=>{
            callback(res);
        });
    }catch(error){
        console.log(error);
    }
}

function listenEvent(topic, callback){
    try{
        ipcRenderer.once("[res]" + topic, (event, res)=>{
            callback(res);
        });
    }catch(error){
        console.log(error);
    }
}

let provider = {
    request,
    listenEvent,
    requestWithResponse
}

export default provider;