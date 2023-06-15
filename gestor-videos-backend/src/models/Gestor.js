import { Schema, model } from "mongoose";

let managerSchema = new Schema(
  {},
  {
    versionKey: false,
  }
);

export default model("managerSchema", managerSchema);
