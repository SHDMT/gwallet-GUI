//const gravityData = require("../js/data/gravitydata");
function clearNetworkInfo(){
    $('.network-Peers-info').html("");
}

function addNetworkPeer(ip, port){
    let content = $('.network-Peers-info').html()
    let data = `
    <tr class="row">
        <td class="col-md-8">${ip}</td>
        <td class="col-md-4">${port}</td>
    </tr>
    `
    $('.network-Peers-info').html(content + data);
}

function updateNetworkInfo(){
    clearNetworkInfo()
    gravityData.getPeers().then(res=>{
        if (res.errorCode == 0 && res.data && res.data != 'null') {
            clearNetworkInfo()
            let peers = JSON.parse(res.data);
            peers.forEach(peer => {
                let host = peer.host;
                let hostItems = host.split(':');
                let ip = hostItems[0];
                let port = hostItems[1];
                addNetworkPeer(ip, port)
            })
            console.log(peers)

        }
    }).catch(err=>{
        console.log("Can't get network info, error:",err);
    });
}