import { Schema, model } from "mongoose";

let ratingSchema = new Schema(
  {
    rating: { type: Number, required: true },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        userRating: { type: Number, required: true },
      },
    ],
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default model("Rating", ratingSchema);
