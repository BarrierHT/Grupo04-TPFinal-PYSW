import ratingSchema from "../models/Rating.js";
import { errorHandler } from "../utils/errorHandler.js";

//Controller para gestionar valoraciones de un video

const getRating = async (req, res, next) => {
  try {
    const { videoId } = req.params;

    const ratingFound = await ratingSchema.findOne({ videoId: videoId });

    if (!ratingFound) throw errorHandler("The rating does not exist", 404, {});

    res.status(200).json({ message: "Rating found", rating: ratingFound });
  } catch (err) {
    next(err);
  }
};

const postRating = async (req, res, next) => {
  try {
    const { videoId } = req.params;

    const ratingExists = await ratingSchema.findOne({ videoId: videoId });

    if (ratingExists) {
      const userIndex = ratingExists.users.findIndex(
        (user) => user.userId.toString() === req.userId
      );

      if (userIndex !== -1) {
        ratingExists.rating -= 1;
        ratingExists.users.splice(userIndex, 1);

        await ratingExists.save();
        return res
          .status(200)
          .json({ message: "Rating updated", rating: ratingExists });
      }

      ratingExists.rating += 1;
      ratingExists.users.push({ userId: req.userId });

      await ratingExists.save();

      return res
        .status(200)
        .json({ message: "Rating updated", rating: ratingExists });
    }

    const newRating = new ratingSchema({
      videoId: videoId,
      rating: 1,
    });

    newRating.users.push({ userId: req.userId });

    await newRating.save();
    res.status(200).json({ message: "Rating created", rating: newRating });
  } catch (err) {
    next(err);
  }
};

const ratingController = {
  getRating,
  postRating,
};

export default ratingController;
