const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.addSing = functions.https.onRequest((request, response) => {
    if (request && request.body) {
        if (!request.body.hasOwnProperty('name')) {
            response.status(500).send({err: 'Missing name'});
        }
        if (!request.body.hasOwnProperty('artist')) {
            response.status(500).send({err: 'Missing artist'});
        }
        const sing = {
            name: request.body['name'],
            artist: request.body['artist'],
            image: request.body['image']
        };
        admin.database().ref('/sings').push(sing)
            .then(() => response.status(201).send(JSON.stringify(sing)))
            .catch((error) => response.status(500).send(error));
    } else {
        response.status(500).send({err: 'Missing body'});
    }
});
