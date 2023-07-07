import playlistSchema from "../models/Playlist.js";
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
    const { name, description } = req.body;

    const newPlaylist = new playlistSchema({
      name: name,
      description: description,
      videos: [],
      owner: req.userId,
    });

    await newPlaylist.save();
    res.status(200).json({ message: "Playlist created" });
  } catch (err) {
    next(err);
  }
};

const addVideoToPlaylist = async (req, res, next) => {
  try {
    const { playlistId, videoId } = req.params;

    console.log(req.params);

    const playlist = await playlistSchema.findById({ _id: playlistId });

    if (!playlist) {
      throw errorHandler("Playlist not found", 404, {});
    }

    const videoExist = playlist.videos.some((video) => video.videoId.toString() == videoId);

    if (videoExist) throw errorHandler("Video already in playlist", 400, {});

    playlist.videos.push({ videoId });
    const updatedPlaylist = await playlist.save();

    res.status(200).json({
      message: "Video added to playlist",
      playlist: updatedPlaylist,
    });
  } catch (err) {
    next(err);
  }
};

const getPlaylistsByUser = async (req, res, next) => {
  try {
    const playlists = await playlistSchema
      .find({ owner: req.userId })
      .populate("videos.videoId");

    if (!playlists) throw errorHandler("An error happened", 404, {});

    res.status(200).json({ message: "Playlists found", playlists });
  } catch (err) {
    next(err);
  }
};

const playListController = {
  getPlaylist,
  postPlaylist,
  getPlaylistsByUser,
  addVideoToPlaylist,
};

export default playListController;
