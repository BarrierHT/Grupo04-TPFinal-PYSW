import userSchema from '../models/User.js';
import { errorHandler } from '../utils/errorHandler.js';

//Controller para gestionar usuarios, gestores y administradores(distinto de auth)

const getUsers = async (req, res, next) => {
	try {
		const users = await userSchema.find();

		if (users.length === 0) throw errorHandler('No users', 404, {});

		res.json(users);
	} catch (err) {
		next(err);
	}
};

const getUser = async (req, res, next) => {
	try {
		const user = await userSchema.findOne({ _id: req.userId });

		if (!user) throw errorHandler('The user does not exist', 404, {});

		res.json(user);
	} catch (error) {
		next(err);
	}
};

const userController = {
	getUsers,
	getUser,
};

export default userController;
