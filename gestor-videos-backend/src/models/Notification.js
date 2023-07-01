import { Schema, model } from 'mongoose';

let notificationSchema = new Schema(
	{
		content: { type: String, required: true },
		receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model('Notification', notificationSchema);
