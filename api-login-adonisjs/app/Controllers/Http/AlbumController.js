'use strict'

const Album = use("App/Models/Album");

class AlbumController {
    async Get({ response, request }) {
        try {
            const albums = await Album.query()
                .with("songs")
                .orderBy('id', "desc")
                .fetch()
            return response.status(200).send(albums);
        } catch (error) {
            return response.status(400);

        }
    }

    async GetForId({ response, params }) {
        try {
            const albums = await Album.query()
                .with("songs")
                .where('id', params.id)
                .first()
            return response.status(200).send(albums);
        } catch {
            return response.status(400);
        }
    }

    async Create({ response, request }) {
        try {
            const { artist, album } = request.all()
            const newAlbum = new Album()
            newAlbum.name = album;
            newAlbum.artist = artist;
            await newAlbum.save();
            return response.status(200).send(newAlbum);
        } catch {
            return response.status(400)
        }
    }
    async Delete({ response, params }) {
        try {
            const albums = await Album.find(params.id);
            return response.status(200).send(albums.delete());
        } catch {
            return response.status(400)
        }
    }
    async UploadImage({ response, params, request }) {
        try {
            const image = request.file("album_image", {
                types: ["image"],
                size: "10mb"
            });
            await image.move("public/uploads", {
                name: `${new Date().getTime()}.jpg`
            })
            const pathImage = `http://localhost:3333/uploads/${image.fileName}`;

            const album = await Album.find(params.id);
            album.imagem = pathImage;


            album.save();
            return response.status(200).send(album);
        } catch {
            return response.status(400);
        }

    }
}

module.exports = AlbumController
