//Controller para gestionar notificaciones

import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";
import notificationSchema from "../models/Notification.js";
import { errorHandler } from "../utils/errorHandler.js";

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.API_KEY_SENDGRID,
    },
  })
);

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

const getNotifications = async (req, res, next) => {
  // const { userId } = req.params;

  try {
    const notifications = await notificationSchema.find();

    if (notifications.length === 0)
      throw errorHandler("You dont have notifications", 404, {});

    res.json(notifications);
  } catch (err) {
    next(err);
  }
};

const notificationController = {
  // sendNotification,
  getNotifications,
};

export default notificationController;
