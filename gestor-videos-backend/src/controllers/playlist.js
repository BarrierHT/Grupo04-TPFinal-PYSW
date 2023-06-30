import playlistSchema from "../models/ListaDeReproduccion.js";
import { errorHandler } from "../utils/errorHandler.js";

//Controller para gestionar playlists de videos

const getPlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const playlistFound = await playlistSchema.findById({ _id: id });

    if (!playlistFound)
      throw errorHandler("The playlist does not exist", 404, {});

    res.json(playlistFound);
  } catch (err) {
    next(err);
  }
};

const postPlaylist = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;

    const newPlaylist = new playlistSchema({
      nombre: nombre,
      descripcion: descripcion,
    });

    await newPlaylist.save();
    res.json(newPlaylist);
  } catch (err) {
    next(err);
  }
};

const playListController = {
  getPlaylist,
  postPlaylist,
};

export default playListController;
