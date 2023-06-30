import ratingSchema from "../models/Valoracion.js";
import { errorHandler } from "../utils/errorHandler.js";

//Controller para gestionar valoraciones de un video

const getRating = async (req, res, next) => {
  try {
    const { videoId } = req.params;

    const ratingFound = await ratingSchema.findById({ _id: videoId });

    if (!ratingFound) throw errorHandler("The rating does not exist", 404, {});

    res.json(ratingFound);
  } catch (err) {
    next(err);
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
    next(err);
  }
};

const ratingController = {
  getRating,
  postRating,
};

export default ratingController;
