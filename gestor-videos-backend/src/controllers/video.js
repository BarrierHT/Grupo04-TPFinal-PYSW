import videoSchema from "../models/Video.js";

//Controller para gestionar videos (funciones CRUD y similares)

const getVideos = async (req, res, next) => {
  try {
    const videos = await videoSchema.find();

    if (videos.length === 0)
      return res.status(404).json({ message: "No hay videos" });

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    console.log(err);
  }
};

const getVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;

    const videoFound = await videoSchema.findById({ _id: videoId });

    if (!videoFound)
      return res.status(404).json({ message: "El video no existe" });

    res.json(videoFound);
  } catch (err) {
    res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    console.log(err);
  }
};

const postVideo = async (req, res, next) => {
  try {
    const { titulo, duracion, url, reproducciones } = req.body;

    const newVideo = new videoSchema({
      titulo: titulo,
      duracion: duracion,
      url: url,
      reproducciones: reproducciones,
    });

    await newVideo.save();
    res.json(newVideo);
  } catch (err) {
    res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    console.log(err);
  }
};

const videoController = {
  getVideos,
  getVideo,
  postVideo,
};

export default videoController;
