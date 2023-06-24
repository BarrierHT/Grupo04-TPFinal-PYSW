import express from 'express';
import notificaionController from '../controllers/notification.js';

const router = express.Router();

router.get('/get-notifications', notificaionController.getNotifications);

//exportamos el modulo de rutas

export default router;
