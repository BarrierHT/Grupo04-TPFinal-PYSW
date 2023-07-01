import { Schema, model } from "mongoose";

let videoSchema = new Schema(
  {
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    url: { type: String, required: true },
    reproductions: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    versionKey: false,
  }
);

export default model("Video", videoSchema);
