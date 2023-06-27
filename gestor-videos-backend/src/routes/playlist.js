import express from 'express';
import playListController from '../controllers/playlist.js';

const router = express.Router();

router.get('/get-playlist', playListController.getPlaylist);
router.get('/add-playlist', playListController.postPlaylist);

//exportamos el modulo de rutas

export default router;
