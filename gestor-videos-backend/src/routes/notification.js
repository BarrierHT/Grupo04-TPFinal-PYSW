import express from 'express';
import notificationController from '../controllers/notification.js';
import { isAuth } from '../middlewares/is-Auth.js';

const router = express.Router();

router.get(
	'/get-notifications',
	isAuth,
	notificationController.getNotificationsByUser
);

router.put(
	'/toogle-notification',
	isAuth,
	notificationController.putToggleNotification
);

router.put(
	'/update-new-notification',
	isAuth,
	notificationController.putUpdateNewNotification
);

// router.post('/add-notification', notificationController.sendNotification);

//exportamos el modulo de rutas

export default router;
