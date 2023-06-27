import express from 'express';
import notificationController from '../controllers/notification.js';

const router = express.Router();

router.get(
	'/get-notifications/:userId',
	notificationController.getNotifications
);
router.post('/add-notification', notificationController.sendNotification);

//exportamos el modulo de rutas

export default router;
