const admin = require('firebase-admin')

const serviceAccount = require('../../../hescas-notification-firebase-adminsdk-2x75x-4a3b5dae0b.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})