
function response(res, topic, err, data){
    try{
        if(null != err){
            res.send("[res]" + topic, {
                status: 500,
                data: err
            });
            return;
        }
        res.send("[res]" + topic, {
            status: 200,
            data: data
        });
    }catch(err){
        console.log("Response exception:", err);
    }
}

module.exports = response;