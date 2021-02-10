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


//Albums

Route.get("/albums", 'AlbumController.Get').middleware(['auth:jwt']);
Route.get("/albums/:id", "AlbumController.GetForId");
Route.post("/albums", "AlbumController.Create"); 
Route.delete("/albums/:id", "AlbumController.Delete" );
Route.put("/albums/:id/photo", "AlbumController.UploadImage");

//Songs

Route.post("/albums/:id/song/add", "SongController.Add");
Route.delete("/songs/:id", "SongController.Delete"  );

//Users

Route.post('/users', 'UserController.create');
Route.post('/sessions', 'SessionController.create');
Route.post('/sessions/loggout/:id', 'SessionController.Loggout');