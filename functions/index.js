const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const SENDGRID_API_KEY = functions.config().sendgrid.key 

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.Email = functions.firestore.document('users/{userId}/events/{eventId}')
.onCreate((event, context) => {
    const userId = context.params.userId;

    const db = admin.firestore()

    return db.collection('users').doc(userId)
    .get()
    .then(doc => {

        const user = doc.data()

        const msg = {
            to: user.email,
            from: 'sligosound@outlook.com',

            templateId: 'd-ada639a055794be5a6a3acdd45568662',
            substitutionWrappers: ['{{', '}}'],
            substitutions: {
                name: user.name
            }
        };

        return sgMail.send(msg)
    })
    .then(() => console.log('email sent!'))
    .catch(err => console.log(err))
});