
const FASTFEEDBACK = 1;
const MEDIUMFEEDBACK = 5;
const SLOWFEEDBACK = 10;

let index = 0;
let intervalObj = null;
let listeners = new Map();
let servers = new Map();
function addPulseListener(topic, callback){
    
    let callbacks = listeners.get(topic);
    if(callbacks == undefined){
        callbacks = [callback];
    }else{
        callbacks.push(callback);
    }
    listeners.set(topic, callbacks);
}

function removePulseListener(topic, callback){
    let callbacks = listeners.get(topic);
    callbacks.splice(callbacks.indexOf(callback), 1);
    listeners.set(topic, callbacks);
}

function registerPulseServer(topic, callback, feedbackInterval){
    servers.set(topic, {
        topic: topic,
        callback: callback,
        interval: feedbackInterval
    });
}

function removePulseServer(topic){
    servers.delete(topic);
}

function handlePulse(){
    servers.forEach((server, topic)=>{
        if(index % server.interval == 0){
            server.callback((res)=>{
                let lis = listeners.get(topic);
                if(lis !== undefined){
                    lis.forEach(callFunc=>{
                        callFunc(res);
                    })
                }
            });
        }
    });
    index ++;
}

function start(){
    intervalObj = setInterval(()=>handlePulse(), 1000);
}

function stop(){
    clearInterval(intervalObj);
}

let pulse = {
    FASTFEEDBACK,
    MEDIUMFEEDBACK,
    SLOWFEEDBACK,

    start,
    stop,
    addPulseListener,
    removePulseListener,
    registerPulseServer,
    removePulseServer
};

export default pulse;