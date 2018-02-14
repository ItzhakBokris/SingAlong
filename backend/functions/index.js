const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.addSong = functions.https.onRequest((request, response) => {
    if (request && request.body) {
        if (!request.body.hasOwnProperty('name')) {
            response.status(500).send({err: 'Missing name'});
        }
        if (!request.body.hasOwnProperty('artist')) {
            response.status(500).send({err: 'Missing artist'});
        }
        if (!request.body.hasOwnProperty('lyrics')) {
            response.status(500).send({err: 'Missing lyrics'});
        }
        return admin.database().ref('/lyricses').push({text: request.body['lyrics']})
            .then(result => {
                const song = {
                    name: request.body['name'],
                    artist: request.body['artist'],
                    image: request.body['image'],
                    coverImage: request.body['coverImage'],
                    lyrics: result.key
                };
                return admin.database().ref('/songs').push(song)
                    .then(() => response.status(201).send(result.key))
                    .catch((error) => response.status(500).send(error));
            })
            .catch((error) => response.status(500).send(error));
    } else {
        response.status(500).send({err: 'Missing body'});
    }
});
