import videoSchema from "../models/Video.js";
import { errorHandler } from "../utils/errorHandler.js";

//Controller para gestionar videos (funciones CRUD y similares)

const getVideos = async (req, res, next) => {
  try {
    const videos = await videoSchema.find();

    if (videos.length === 0) throw errorHandler("No videos", 404, {});

    res.json(videos);
  } catch (err) {
    next(err);
  }
};

const getVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;

    const videoFound = await videoSchema.findById({ _id: videoId });

    if (!videoFound) throw errorHandler("The video does not exist", 404, {});

    res.json(videoFound);
  } catch (err) {
    next(err);
  }
};

const postVideo = async (req, res, next) => {
  try {
    const { title, duration, url, reproductions } = req.body;

    const newVideo = new videoSchema({
      title: title,
      duration: duration,
      url: url,
      reproductions: reproductions,
    });

    await newVideo.save();
    res.status(200).json({ message: "Video uploaded" });
  } catch (err) {
    next(err);
  }
};

const videoController = {
  getVideos,
  getVideo,
  postVideo,
};

export default videoController;
