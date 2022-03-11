const { DATETIME, DATE } = require("mysql/lib/protocol/constants/types")

module.exports.energyRealtime = function(req, res) {

    const timeStamp = new Date()
    const power = Math.floor(Math.random() * 1000)
    const energy = {
        'hs0001': {
            'place': 'bedroom',
            'power': power, // watt at this time
            'iat': timeStamp,
            'short_circuite': false
        }
    }
    return res.send(energy)
}

// 'energy': {
//     'hs0001' : {
//         'place' : 'bedroom',
//         'power' : '100', // watt at this time
//         'iat'   : 'date time',
//         'short_circuite' : 'false'
//     },
//     'hs0002' : {
//         'place' : 'bahtroom',
//         'power' : '200', // watt at this time
//         'iat'   : 'date time',
//         'short_circuite' : 'false'
//     },
// }

module.exports.history = (req, res) => {
    res.send('this api for history')
}