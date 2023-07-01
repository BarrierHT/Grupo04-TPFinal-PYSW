import { Schema, model } from 'mongoose';

let ratingSchema = new Schema(
	{
		ratingPositive: { type: Number, required: true, default: 0 },
		ratingNegative: { type: Number, required: true, default: 0 },

		users: [
			{
				userId: {
					type: Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				rating: { type: Boolean, required: true },
			},
		],
		videoId: {
			type: Schema.Types.ObjectId,
			ref: 'Video',
			required: true,
		},
	},
	{
		versionKey: false,
	}
);

export default model('Rating', ratingSchema);
