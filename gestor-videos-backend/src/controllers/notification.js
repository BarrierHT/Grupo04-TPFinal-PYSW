//Controller para gestionar notificaciones

import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key: process.env.API_KEY_SENDGRID,
		},
	})
);

const sendNotification = (req, res, next) => {};

const getNotifications = (req, res, next) => {};

const notificaionController = {
	sendNotification,
	getNotifications,
};

export default notificaionController;
