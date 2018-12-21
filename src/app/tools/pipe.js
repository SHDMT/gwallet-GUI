function pipeRegister(topic, callback){
    window.addEventListener(topic, callback);
}

function pipeRemove(topic, callback){
    window.removeEventListener(topic, callback);
}

function pipeInvoke(topic, params){
    var evt = new CustomEvent(topic, { detail: params });
    window.dispatchEvent(evt);
}

let pipe = {
    pipeRegister,
    pipeRemove,
    pipeInvoke
}

export default pipe;