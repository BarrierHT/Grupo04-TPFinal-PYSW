import { Schema, model } from 'mongoose';

let reportSchema = new Schema(
	{
		title: { type: String, required: true },
		reason: { type: String, required: true },

		videoId: {
			type: Schema.Types.ObjectId,
			ref: 'Video',
			required: true,
		},
		reviewed: { type: Boolean, required: true, default: false },
	},
	{
		versionKey: false,
	}
);

export default model('Report', reportSchema);
