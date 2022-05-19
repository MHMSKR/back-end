const { db } = require('../../config/database')
const fs = require('fs')


module.exports.energyRealtime = function (req, res) {
    db.getConnection((err, db) => {
        if (err) return res.status(500).send(err);
        db.query({ sql: "SELECT * FROM `energy_s` ORDER BY iat DESC LIMIT 1", timeout: 1000 },
            (err, result) => {
                if (err) return res.status(500).send(err);
                if (result.length !== 0) {
                    db.query({ sql: "SELECT SUM(energy_s) AS energy_one_h FROM `energy_s`", timeout: 1000 },
                        (err,energy_sum) => {
                            if (err) return res.status(500).send(err);
                            return res.status(200).send({"result_sec":result,"energy_sum":energy_sum});
                        }
                    )
                   
                } else {
                    return res.status(401).send('null')
                }
            })
        db.release();
    })
}

module.exports.energyRealtimeById = function (req, res) {
    const id = req.params.id
    res.send(id)
}

module.exports.hour = function(req,res){
    db.getConnection((err,db)=>{
        if(err) return res.status(500).sent(err)
        db.query({sql:"SELECT * FROM energy_h ORDER BY iat DESC LIMIT 6",timeout:1000},
        (err,result)=>{
            if(err) return res.status(500).sent(err)
            if (result.length !== 0) {
                db.query({ sql: "SELECT SUM(sum_energy) AS sum_energy_one_day FROM `energy_h`", timeout: 1000 },
                    (err,energy_sum) => {
                        if (err) return res.status(500).send(err);
                        return res.status(200).send({"result_hour":result,"energy_sum":energy_sum});
                    }
                )
               
            } else {
                return res.status(401).send('null')
            }
        }) 
    })
}

module.exports.history = (req, res) => {
    res.send('this api for history')
}