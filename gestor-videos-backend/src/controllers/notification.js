//Controller para gestionar notificaciones

import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";
import notificationSchema from "../models/Notificacion.js";

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.API_KEY_SENDGRID,
    },
  })
);

const sendNotification = async (req, res, next) => {
  try {
    const { contenido } = req.body;

    const newNotification = new notificationSchema({
      contenido: contenido,
    });

    await newNotification.save();
    res.json(newNotification);
  } catch (err) {
    res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    console.log(err);
  }
};

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationSchema.find();

    if (notifications.length === 0)
      return res.status(404).json({ message: "No hay notificaciones" });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    console.log(err);
  }
};

const notificationController = {
  sendNotification,
  getNotifications,
};

export default notificationController;
