import { errorHandler } from '../utils/errorHandler.js';
import userSchema from '../models/User.js';

export const isUser = async (req, res, next) => {
	try {
		if (!req.userId)
			throw errorHandler('Error between middlewares', 500, {});
		const user = await userSchema.findOne({ _id: req.userId });

		if (user.role !== 'user') throw errorHandler('Not Authorized', 403, {}); //* Mark of testing (3)
		next();
	} catch (error) {
		next(error);
	}
};
