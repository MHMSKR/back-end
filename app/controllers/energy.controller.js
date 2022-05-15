const { db } = require('../../config/database')
const fs = require('fs')


module.exports.energyRealtime = function(req, res) {
    db.getConnection((err,db)=>{
        if(err) return res.status(500).send(err);
        db.query({sql:"SELECT * FROM `energy_s` ORDER BY iat DESC LIMIT 1",timeout:1000},
            (err,result)=>{
                if(err) return res.status(500).send(err);
                if(result.length !== 0){
                    return res.status(200).send(result);
                }else{
                    return res.status(401).send('bad')
                }
        })
        db.release();
    })
}

module.exports.energyRealtimeById = function(req,res){

}


module.exports.history = (req, res) => {
    res.send('this api for history')
}