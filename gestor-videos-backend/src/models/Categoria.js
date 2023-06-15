import { Schema, model } from "mongoose";

let categorySchema = new Schema(
  {
    nombre: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default model("categorySchema", categorySchema);
