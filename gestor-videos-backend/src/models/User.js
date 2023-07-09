import { Schema, model } from 'mongoose';

let userSchema = new Schema(
	{
		name: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phoneNumber: { type: String, required: true },
		username: { type: String, required: true },
		role: { type: String, required: true, default: 'user' },
	},
	{
		versionKey: false,
	}
);

export default model('User', userSchema);
