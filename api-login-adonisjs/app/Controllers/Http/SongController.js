'use strict'
const Song = use("App/Models/Song");

class SongController {
    async Add({ response, params, request }) {
        try {
            const song = new Song();
            song.album_id = params.id;
            song.name = request.input("song");
            return response.status(200).send(song);
        } catch {
            return response.status(400);
        }
    }
    async Delete({response, params }) {
        try {
            const songs = await Song.find(params.id);
            return response.status(200).send(songs.delete());
        } catch {
            return response.status(400);
        }

    }
}

module.exports = SongController
