import userSchema from '../models/User.js';
import channelSchema from '../models/Channel.js';

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

		const hasMatch = await bcrypt.compare(password, user.password);

		if (!hasMatch)
			throw errorHandler(
				'A user with this password was not found',
				401,
				{}
			);

		const token = jwt.sign(
			{ userId: loadedUser._id.toString() },
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
		const { username, email, password, phoneNumber, name } = req.body;

		// console.log(username, email, password, telefono, name);

		const user = await userSchema.findOne({ email });

		if (user) throw errorHandler('The email is registered', 409, {});

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = new userSchema({
			name: name,
			password: hashedPassword,
			email: email,
			phoneNumber: phoneNumber,
			username: username,
		});

		await newUser.save();

		const newChannel = new channelSchema({
			name,
			description: 'Bienvenido a mi canal!',
			owner: newUser._id,
		});
		await newChannel.save();
		res.status(200).json({ message: 'Registered successfully' });
	} catch (err) {
		next(err);
	}
};

const authController = {
	postLogin,
	postSignup,
};

export default authController;
