import playlistSchema from "../models/ListaDeReproduccion.js";

//Controller para gestionar playlists de videos

const getPlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const playlistFound = await playlistSchema.findById({ _id: id });

    if (!playlistFound)
      return res.status(404).json({ message: "La playlist no existe" });

    res.json(playlistFound);
  } catch (err) {
    res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    console.log(err);
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
    res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    console.log(err);
  }
};

const playListController = {
  getPlaylist,
  postPlaylist,
};

export default playListController;
