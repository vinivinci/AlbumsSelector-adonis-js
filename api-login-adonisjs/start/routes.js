'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const Album = use("App/Models/Album");
const Song = use("App/Models/Song");

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.get("/albums", async () => {
    const albums = await Album.query()
      .with("songs")
      .orderBy('id', "desc")
      .fetch()

    return albums;
} )
Route.get("/albums/:id", async ({params}) => {
  const albums = await Album.query()
    .with("songs")
    .where('id', params.id)
    .first()

  return albums;
} )

Route.post("/albums", async ({ request })=>{
  const {artist, album} = request.all()

  const newAlbum = new Album()
  newAlbum.name = album;
  newAlbum.artist = artist;
  try{
    await newAlbum.save();
    return newAlbum;
  }catch(ex){
    return ex;
  }
  
}) 

Route.delete("/albums/:id", async ({params}) => {
  const albums = await Album.find(params.id);
  
  try{
    return albums.delete();
  }
  catch(err){
    return false;
  }
  
} )

Route.post("/albums/:id/song/add", async({params,request})=>{
  const song = new Song();

  song.album_id = params.id;
  song.name = request.input("song");

  try{
    return song;

  }catch(err){
    return null;
  }
})

Route.put("/albums/:id/photo", async({params, request}) =>{
  const image = request.file("album_image",{
    types:["image"],
    size:"10mb"
  });
  await image.move("public/uploads", {
    name: `${new Date().getTime()}.jpg`
  })
  const pathImage = `http://localhost:3333/uploads/${image.fileName}`;

  const album = await Album.find(params.id);
  album.imagem = pathImage;

  try{
    album.save();
    return album;
  }catch{
    return null;
  }
})
Route.delete("/songs/:id", async ({params}) => {
  const songs = await Song.find(params.id);
  try{
    return songs.delete();
  }
  catch(err){
    return false;
  }
  
} )