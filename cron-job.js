const { db } = require('./config/database');
const cron = require('node-cron');
const fs = require('fs');

cron.schedule('0 */1 * * *', () => {  // job to do every one hour
    try {

        const millis_now = new Date().getTime(); // get millisec in now time
        db.getConnection((err, db) => { // connecting db
            if (err) throw err
            db.query({ sql: "SELECT MIN(iat) AS lastTimer FROM energy_s", timeout: 1000 }, // query last iat in energy_s 
                (err, result) => {
                    if (err) throw err;
                    console.log(result[0].lastTimer, ":", millis_now)
                    const lastTimer = result[0].lastTimer // set lastTimer

                    // query sum energy , avg power, avg current, end timer
                    db.query({ sql: "SELECT MIN(iat) AS time,SUM(energy_s) AS sum_energy,AVG(power_s) AS avg_power,AVG(current_s) AS avg_current FROM energy_s WHERE iat >= ? AND iat <= ?", timeout: 1000 },
                        [lastTimer, millis_now],
                        (err, result) => {
                            if (err) throw err;
                            if (result.length !== 0 && result[0].time !== null && result[0].sum_energy !== null && result[0].avg_power !== null && result[0].avg_current !== null) {
                                db.query({ sql: "INSERT INTO energy_h (iat,sum_energy,avg_power,avg_current) VALUES (?,?,?,?)", timeout: 1000 },
                                    [millis_now.toString(), result[0].sum_energy, result[0].avg_power, result[0].avg_current],
                                    (err, result) => {
                                        if (err) throw err;
                                        console.log('success insert new table h');
                                    }
                                )

                                db.query({ sql: "SELECT * FROM energy_s WHERE iat >= ? AND iat <= ?", timeout: 1000 },
                                    [lastTimer, millis_now],
                                    (err, result) => {
                                        if (err) throw err
                                        if (result.length !== 0) {
                                            try {
                                                db.query({ sql: "DELETE FROM energy_s WHERE iat >= ? AND iat < ? ", timeout: 1000 },
                                                    [lastTimer, millis_now - 1000],
                                                    (err, result) => {
                                                        if (err) throw err
                                                    }
                                                )
                                            } catch (error) {
                                                throw error
                                            }
                                        }


                                    }
                                )
                            }

                        })

                }
            )
            db.release();

        })

    } catch (error) {
        console.log(error)
    }

})



cron.schedule('59 23 */1 * *', () => {
    try {
        const millis_now = new Date().getTime(); // get millisec in now time
        db.getConnection((err, db) => { // connecting db
            if (err) throw err
            db.query({ sql: "SELECT MIN(iat) AS lastTimer FROM energy_h", timeout: 1000 }, // query last iat in energy_s 
                (err, result) => {
                    if (err) throw err;
                    const lastTimer = result[0].lastTimer // set lastTimer

                    // query sum energy , avg power, avg current, end timer
                    db.query({ sql: "SELECT MIN(iat) AS time,SUM(sum_energy) AS sum_energy FROM energy_h WHERE iat >= ? AND iat <= ?", timeout: 1000 },
                        [lastTimer, millis_now],
                        (err, result) => {
                            if (err) throw err;
                            if (result.length !== 0 && result[0].time !== null && result[0].sum_energy !== null) {
                                db.query({ sql: "INSERT INTO energy_d (date_of_month,sum_energy) VALUES (?,?)", timeout: 1000 },
                                    [result[0].time, result[0].sum_energy],
                                    (err, result) => {
                                        if (err) throw err;
                                        console.log('success insert new table d');
                                    }
                                )
                                db.query({ sql: "SELECT * FROM energy_h WHERE iat >= ? AND iat <= ?", timeout: 1000 },
                                    [lastTimer, millis_now],
                                    (err, result) => {
                                        if (err) throw err
                                        if (result.length !== 0) {
                                            const backup = JSON.stringify(result)
                                            try {
                                                const foldername = `${new Date().getFullYear()}-${new Date().getMonth()}`
                                                const filename = new Date().getDay();
                                                fs.mkdir(`public/files/back-up/${foldername}`, { recursive: true }, (err) => {
                                                    if (err) {
                                                        throw err
                                                    } else {
                                                        fs.appendFile(`public/files/back-up/${foldername}/${filename}.json`, backup, (err) => {
                                                            if (err) throw err
                                                            console.log('success save to backup')
                                                        })
                                                    }
                                                })

                                                db.query({ sql: "DELETE FROM energy_h WHERE iat >= ? AND iat < ? ", timeout: 1000 },
                                                    [lastTimer, millis_now - 1000],
                                                    (err, result) => {
                                                        if (err) throw err
                                                    }
                                                )
                                            } catch (error) {
                                                throw error
                                            }
                                        }


                                    }
                                )
                            }

                        })

                }
            )
            db.release();

        })

    } catch (error) {
        console.log(error)
    }
})

