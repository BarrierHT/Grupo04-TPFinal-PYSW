import express from 'express';
import notificationController from '../controllers/notification.js';

const router = express.Router();

router.get('/get-notifications', notificationController.getNotifications);

//exportamos el modulo de rutas

export default router;
