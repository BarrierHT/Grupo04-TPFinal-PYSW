import userSchema from '../models/Usuario.js';
import { errorHandler } from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//Controller para gestionar la autenticacion usuarios normales

const postLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		console.log(email, password);

		let loadedUser = null;

		const user = await userSchema.findOne({ email });

		if (!user)
			throw errorHandler('A user with this email was not found', 401, {});

		loadedUser = user;

		//ToDo return bcrypt.compare(password, user.password);
		const hasMatch = password === user.password;

		if (!hasMatch)
			throw errorHandler(
				'A user with this password was not found',
				401,
				{}
			);

		const token = jwt.sign(
			{ email, userId: loadedUser._id.toString() },
			process.env.SECRET_JWT_AUTHENTICATION,
			{ expiresIn: '2h' }
			//Should reactivate every 2 hours
		);

		return res.status(200).json({
			message: 'User logged correctly!',
			token,
			userId: loadedUser._id.toString(),
		});
	} catch (error) {
		next(error);
	}
};

const postSignup = async (req, res, next) => {
	try {
		const { username, email, password, telefono, name } = req.body;

		console.log(username, email, password, telefono, name);

		const newUser = new userSchema({
			nombre: name,
			password: password,
			email,
			telefono: telefono,
			username,
			rol: 'usuario',
		});

		await newUser.save();
		res.json(newUser);
	} catch (err) {
		res.status(500).json({ message: 'Ocurrio un error, pruebe mas tarde' });
		console.log(err);
	}
};

const authController = {
	postLogin,
	postSignup,
};

export default authController;
