import { Schema, model } from 'mongoose';

let videoSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		url: { type: String, required: true },
		owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: false },
		thumbnail: { type: String, required: false },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model('Video', videoSchema);
