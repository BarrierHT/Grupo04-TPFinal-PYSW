import { Schema, model } from "mongoose";

let reportSchema = new Schema(
  {
    motivo: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default model("reportSchema", reportSchema);
