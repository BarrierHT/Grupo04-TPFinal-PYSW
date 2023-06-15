import { Schema, model } from "mongoose";

let notificationSchema = new Schema(
  {
    contenido: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("notificationSchema", notificationSchema);
