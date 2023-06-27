import express from 'express';
import playListController from '../controllers/playlist.js';

const router = express.Router();

router.get('/get-playlist/:id', playListController.getPlaylist);
router.post('/add-playlist', playListController.postPlaylist);

//exportamos el modulo de rutas

export default router;
