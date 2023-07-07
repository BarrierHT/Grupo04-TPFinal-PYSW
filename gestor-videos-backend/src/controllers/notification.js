//Controller para gestionar notificaciones

import jwt from 'jsonwebtoken';
import notificationSchema from '../models/Notification.js';
import { errorHandler } from '../utils/errorHandler.js';

// const sendNotification = async (req, res, next) => {
//   try {
//     const { message, grupo, infoTitle } = req.body;

//     const newNotification = new notificationSchema({
//       contenido: contenido,
//     });

//     await newNotification.save();
//     res.json(newNotification);
//   } catch (err) {
//     next(err);
//   }
// };

const getNotificationsByUser = async (req, res, next) => {
	// const { userId } = req.params;

	try {
		const notifications = await notificationSchema.find({
			owner: req.userId,
		});

		if (!notifications) throw errorHandler('An error happened', 400, {});

		res.status(200).json({ message: 'Notifications found', notifications });
	} catch (err) {
		next(err);
	}
};

const putToggleNotification = async (req, res, next) => {
	// const { userId } = req.params;

	try {
		const { toggledValue, groupId } = req.body;
		const { userId } = req;

		console.log('toggle: ', toggledValue, groupId);

		const notifications = await notificationSchema.find({
			owner: userId,
		});

		if (!notifications) throw errorHandler('An error happened', 400, {});

		res.status(200).json({ message: 'Notifications found', notifications });
	} catch (err) {
		next(err);
	}
};

const saveNotification = async (content, receiver) => {};

const notificationController = {
	// sendNotification,
	getNotificationsByUser,
	putToggleNotification,
	saveNotification,
};

export default notificationController;
