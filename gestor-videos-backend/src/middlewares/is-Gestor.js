import { errorHandler } from '../utils/errorHandler.js';
import userSchema from '../models/Usuario.js';

export const isGestor = async (req, res, next) => {
	try {
		const { userId } = req.body;
		const user = await userSchema.findOne({ _id: userId });

		if (user.rol !== 'gestor')
			throw errorHandler('Not Authorized', 403, {}); //* Mark of testing (3)
		next();
	} catch (error) {
		next(error);
	}
};
