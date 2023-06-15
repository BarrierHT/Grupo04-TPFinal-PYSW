import { Schema, model } from "mongoose";

let adminSchema = new Schema(
  {},
  {
    versionKey: false,
  }
);

export default model("adminSchema", adminSchema);
