import { Schema, model } from "mongoose";

let normalUserSchema = new Schema(
  {
    preferencias: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default model("normalUserSchema", normalUserSchema);
