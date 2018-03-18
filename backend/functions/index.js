const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.addSong = functions.https.onRequest((request, response) => {
    if (request && request.body) {
        const name = request.body['name'].trim();
        const artist = request.body['artist'].trim();
        const image = request.body['image'].trim();
        const coverImage = request.body['coverImage'].trim();
        const lyrics = request.body['lyrics'].trim();
        if (!name) {
            response.status(500).send({err: 'Missing name'});
        }
        if (!artist) {
            response.status(500).send({err: 'Missing artist'});
        }
        if (!lyrics) {
            response.status(500).send({err: 'Missing lyrics'});
        }
        return admin.database().ref('/lyricses').push({text: lyrics})
            .then(result => {
                return admin.database().ref('/songs')
                    .push({name, artist, image, coverImage, lyrics: result.key})
                    .then(() => response.status(201).send(result.key))
                    .catch((error) => response.status(500).send(error));
            })
            .catch((error) => response.status(500).send(error));
    } else {
        response.status(500).send({err: 'Missing body'});
    }
});
