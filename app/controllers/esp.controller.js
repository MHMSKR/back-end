const passport = require('passport');
const { db } = require('../../config/database');

module.exports.postData = (req, res) => {
    const energy = req.body.energy;
    const power = req.body.power;
    const current = req.body.current;
    const state = req.body.state;
    const voltage = req.body.voltage;
    const frequency = req.body.frequency;
    const power_factor = req.body.power_factor;
    const iat = new Date().getTime();
    passport.authenticate('esp_auth', { session: false },
        (err, esp_id) => {
            if (err) return res.status(401).send(err)
            if (esp_id) {
                db.getConnection((err, db) => {
                    db.query({sql:"INSERT INTO energy_s (iat,esp_id,power_s,current_s,energy_s,voltage_s,frequency_s,power_factor,state) VALUES(?,?,?,?,?,?,?,?,?)",timeout:1000},
                    [iat,esp_id,power,current,energy,voltage,frequency,power_factor,state],
                    (err,result)=>{
                        if(err){
                            console.log('error while query db')
                            return res.status(500).send({message:'error while query db',err})
                            
                        } 
                        return res.status(200).send({message:'ok'})
                    });
                    if(err) {
                        return res.status(500).send({message:'error while connecting DB',err})}
                    db.release();
                })
                
            } else {
                return res.status(422).send({ message: "not have device please generate token" })
            }
        })(req, res)
}