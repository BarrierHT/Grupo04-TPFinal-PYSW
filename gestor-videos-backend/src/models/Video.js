import { Schema, model } from "mongoose";

let videoSchema = new Schema(
  {
    titulo: { type: String, required: true },
    duracion: { type: Number, required: true },
    url: { type: String, required: true },
    reproducciones: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

export default model("videoSchema", videoSchema);
