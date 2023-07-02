import { Schema, model } from 'mongoose';

let groupSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		users: [
			{
				dateOfJoining: { type: Date, required: true },
				sendNotification: {
					type: Boolean,
					required: true,
					default: false,
				},
				sendEmailNotification: {
					type: Boolean,
					required: true,
					default: false,
				}
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model('Group', groupSchema);