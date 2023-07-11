import { Schema, model } from "mongoose";

let ratingSchema = new Schema(
  {
    rating: { type: Number, required: true, default: 0 },

    users: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
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
