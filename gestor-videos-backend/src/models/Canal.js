import { Schema, model } from "mongoose";

let channelSchema = new Schema(
  {
    descripcion: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default model("channelSchema", channelSchema);