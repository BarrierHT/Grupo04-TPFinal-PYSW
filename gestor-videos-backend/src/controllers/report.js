import reportSchema from "../models/Reporte.js";
import { errorHandler } from "../utils/errorHandler.js";

//Controller para gestionar reclamos sobre un video

const getReport = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reportFound = await reportSchema.findById({ _id: id });

    if (!reportFound) throw errorHandler("The report does not exist", 404, {});
    res.json(reportFound);
  } catch (err) {
    next(err);
  }
};

const postReport = async (req, res, next) => {
  try {
    const { motivo } = req.body;

    const newReport = new reportSchema({
      motivo: motivo,
    });

    await newReport.save();
    res.json(newReport);
  } catch (err) {
    next(err);
  }
};

const reportController = {
  getReport,
  postReport,
};

export default reportController;
