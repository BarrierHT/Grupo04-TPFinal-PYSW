import { Schema, model } from "mongoose";

let playlistSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    versionKey: false,
  }
);

export default model("Playlist", playlistSchema);
