//Controller para gestionar notificaciones

import notificationSchema from '../models/Notification.js';
import groupSchema from '../models/Group.js';

import { errorHandler } from '../utils/errorHandler.js';

const getNotificationsByUser = async (req, res, next) => {
	// const { userId } = req.params;

	try {
		const notifications = await notificationSchema.find({
			receiver: req.userId,
		});

		if (!notifications) throw errorHandler('An error happened', 400, {});

		res.status(200).json({ message: 'Notifications found', notifications });
	} catch (err) {
		next(err);
	}
};

const putToggleNotification = async (req, res, next) => {
	try {
		const { toggledValue, groupId } = req.body;
		let groupFound = await groupSchema
			.findById(groupId)
			.populate('users.userId');

		if (!groupFound) throw errorHandler('Group not found', 404, {});

		let updatedGroup = groupFound;

		updatedGroup.users = groupFound.users.map(user => {
			if (user.userId._id.toString() == req.userId) {
				// console.log('toggle: ', user.sendNotification, toggledValue);
				user.sendNotification = toggledValue;
			}
			return user;
		});

		await updatedGroup.save();

		res.status(200).json({
			message: 'Notification User in group Updated',
		});
	} catch (err) {
		next(err);
	}
};

const putUpdateNewNotification = async (req, res, next) => {
	try {
		const { newNotifications } = req.body;

		console.log('new notifications: ', newNotifications);

		const notificationIds = newNotifications.map(
			notification => notification._id
		);

		await notificationSchema.updateMany(
			{ _id: { $in: notificationIds } },
			{ $set: { viewed: true } }
		);

		res.status(200).json({
			message: 'Notifications updated',
		});
	} catch (err) {
		next(err);
	}
};

const saveNotification = async (content, receiver, sender) => {
	try {
		const notificationData = {
			content,
			...(receiver && { receiver }),
			...(sender && { sender }),
		};

		console.log('Campos enviados:', Object.keys(notificationData));

		const newNotification = new notificationSchema(notificationData);

		await newNotification.save();
		return { message: 'Notification created' };
	} catch (err) {
		next(err);
	}
};

const notificationController = {
	// sendNotification,
	getNotificationsByUser,
	putToggleNotification,
	saveNotification,
	putUpdateNewNotification,
};

export default notificationController;
