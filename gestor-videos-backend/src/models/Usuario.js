import { Schema, model } from 'mongoose';

let userSchema = new Schema(
	{
		nombre: { type: String, required: true },
		password: { type: String, required: true },
		correo: { type: String, required: true },
		telefono: { type: String, required: true },
		username: { type: String, required: true },
		rol: { type: String, required: true },
	},
	{
		versionKey: false,
	}
);

export default model('userSchema', userSchema);
