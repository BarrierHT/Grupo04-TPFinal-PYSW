import reportSchema from "../models/Reporte.js";

//Controller para gestionar reclamos sobre un video

const getReport = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reportFound = await reportSchema.findById({ _id: id });

    if (!reportFound)
      return res.status(404).json({ message: "El reporte no existe" });
    res.json(reportFound);
  } catch (err) {
    res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    console.log(err);
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
    res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    console.log(err);
  }
};

const reportController = {
  getReport,
  postReport,
};

export default reportController;
