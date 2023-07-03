import express from 'express';
import notificationController from '../controllers/notification.js';
import { isAuth } from '../middlewares/is-Auth.js';

const router = express.Router();

router.get(
	'/get-notifications/:userId',
	isAuth,
	notificationController.getNotificationsByUser
);
// router.post('/add-notification', notificationController.sendNotification);

//exportamos el modulo de rutas

export default router;
