import express from 'express';
import playListController from '../controllers/playlist.js';
import { isAuth } from '../middlewares/is-Auth.js';

const router = express.Router();

router.get('/get-playlist/:id', isAuth, playListController.getPlaylist);
router.get('/get-playlists', isAuth, playListController.getPlaylistsByUser);
router.post('/add-playlist', isAuth, playListController.postPlaylist);

//exportamos el modulo de rutas

export default router;
