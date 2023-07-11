import { Schema, model } from 'mongoose';

let channelSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		thumbnail: { type: String, required: false },
	},
	{
		versionKey: false,
	}
);

export default model('Channel', channelSchema);
