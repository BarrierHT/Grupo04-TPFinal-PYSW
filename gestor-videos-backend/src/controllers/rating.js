import ratingSchema from "../models/Valoracion.js";

//Controller para gestionar valoraciones de un video

const getRating = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ratingFound = await ratingSchema.findById({ _id: id });

    if (!ratingFound)
      return res.status(404).json({ message: "La valoracion no existe" });

    res.json(ratingFound);
  } catch (err) {
    res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    console.log(err);
  }
};

const postRating = async (req, res, next) => {
  try {
    const { puntaje } = req.body;

    const newRating = new ratingSchema({
      puntaje: puntaje,
    });

    await newRating.save();
    res.json(newRating);
  } catch (err) {
    res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    console.log(err);
  }
};

const ratingController = {
  getRating,
  postRating,
};

export default ratingController;
