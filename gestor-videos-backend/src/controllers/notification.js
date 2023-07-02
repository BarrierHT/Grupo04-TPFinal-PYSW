//Controller para gestionar notificaciones

import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';
import jwt from 'jsonwebtoken';
import notificationSchema from '../models/Notification.js';
import { errorHandler } from '../utils/errorHandler.js';

const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key: process.env.API_KEY_SENDGRID,
		},
	})
);

const sendEmailNotification = async (content, receiver) => {
	try {
		transporter.sendMail({
			to: receiver,
			from: process.env.EMAIL_USER_SENDGRID,
			subject: 'NUEVO VIDEO EN UN GRUPO EN EL QUE ESTAS',
			html: `<div style="overflow:auto; padding:15px;"> <mark> ${content.data} </mark>  Link : <a target="_blank" href="${content.url}">${content.url}</a> </div>`,
		});
	} catch (err) {
		console.log(err);
	}
};

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

		if (notifications.length === 0)
			throw errorHandler('You dont have notifications', 404, {});

		res.json(notifications);
	} catch (err) {
		next(err);
	}
};

const notificationController = {
	// sendNotification,
	getNotificationsByUser,
	sendEmailNotification,
};

export default notificationController;
