import { Schema, model } from "mongoose";

let playlistSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default model("playlistSchema", playlistSchema);
