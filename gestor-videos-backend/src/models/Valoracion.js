import { Schema, model } from 'mongoose';

let ratingSchema = new Schema(
	{
		puntaje: { type: Number, required: true },
	},
	{
		versionKey: false,
	}
);

export default model('Rating', ratingSchema);
