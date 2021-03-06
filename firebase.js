
const admin = require('firebase-admin')

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(<path to your firebase credentials file>),
  storageBucket: <firebaseprojectid>.appspot.com
})
// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
  bucket
}