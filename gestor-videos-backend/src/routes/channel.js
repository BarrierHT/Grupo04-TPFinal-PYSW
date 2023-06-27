import express from 'express';
import channelController from '../controllers/channel.js';

const router = express.Router();

router.get('/get-channel', channelController.getChannel);

//exportamos el modulo de rutas

export default router;
