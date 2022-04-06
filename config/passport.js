const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const { db } = require('./database')
require('dotenv').config();

const key = process.env.SECRET_KEY


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    db.getConnection((err, db) => {
        if (err) return done(err)
        db.query({ sql: 'SELECT * FROM users WHERE email = ?', timeout: 1000 }, [email.toLowerCase()],
            (err, result) => {
                if (err) return done(err)
                if (result.length == 0) {
                    return done(null, false, { message: 'username not found' })
                } else {
                    const match = bcrypt.compare(password, result[0].passwd)
                    if (!match) {
                        return done(null, false, { message: 'username or password incorrect' })
                    }
                    return done(null, result, { message: 'Loggin Success' })
                }

            })
        db.release();
    })
}))

passport.use(new JwtStrategy({ // get token from bearer header
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key
}, (jwtPayload, done) => {
    db.getConnection((err, db) => {
        if (err) return done(err) // get user data by id in token
        db.query({ sql: 'SELECT * FROM users WHERE user_id = ?', timeout: 1000 }, [jwtPayload._id],
            (err, result) => {
                if (err) return done(err)
                if (result.length == 0) {
                    return done(null, false)
                } else { // Validation token expire and check equa fullname with sub of token jwt
                    if ((result[0].fullname === jwtPayload.sub) && ((new Date().getTime() - jwtPayload.exp) < 0)) {
                        return done(null, result[0])
                    } else {
                        return done(null, false)
                    }
                }
            })
        db.release();
    })
}))