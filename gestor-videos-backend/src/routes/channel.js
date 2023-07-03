import express from 'express';
import channelController from '../controllers/channel.js';
import { isAuth } from '../middlewares/is-Auth.js';

const router = express.Router();

router.get('/get-channel', isAuth, channelController.getChannel);

//exportamos el modulo de rutas

export default router;
