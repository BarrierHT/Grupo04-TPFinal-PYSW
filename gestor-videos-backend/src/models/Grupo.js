import { Schema, model } from "mongoose";

let groupSchema = new Schema(
  {
    nombre: { type: String, required: true },
    usuarios: [
      {
        fechaDeIngreso: { type: Date, required: true },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("groupSchema", groupSchema);
