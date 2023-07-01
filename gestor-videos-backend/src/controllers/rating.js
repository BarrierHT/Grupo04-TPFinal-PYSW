import ratingSchema from "../models/Rating.js";
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
    const { rating } = req.body;

    const newRating = new ratingSchema({
      rating: rating,
    });

    await newRating.save();
    res.status(200).json({ message: "Rating saved" });
  } catch (err) {
    next(err);
  }
};

const ratingController = {
  getRating,
  postRating,
};

export default ratingController;
