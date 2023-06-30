import { Schema, model } from 'mongoose';

let userSchema = new Schema(
	{
		nombre: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		telefono: { type: String, required: true },
		username: { type: String, required: true },
		rol: { type: String, required: true, default: 'usuario' },
	},
	{
		versionKey: false,
	}
);

export default model('User', userSchema);
