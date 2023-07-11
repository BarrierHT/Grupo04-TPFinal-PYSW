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

		const user = await userSchema.findOne({ email });

		if (!user)
			throw errorHandler('A user with this email was not found', 401, {});

		const hasMatch = await bcrypt.compare(password, user.password);

		if (!hasMatch)
			throw errorHandler(
				'A user with this password was not found',
				401,
				{}
			);

		const token = jwt.sign(
			{ userId: user._id.toString() },
			process.env.SECRET_JWT_AUTHENTICATION,
			{ expiresIn: '2h' }
			//Should reactivate every 2 hours
		);

		return res.status(200).json({
			message: 'User logged correctly!',
			token,
			userId: user._id.toString(),
			userRole: user.role,
		});
	} catch (error) {
		next(error);
	}
};

const postSignup = async (req, res, next) => {
	try {
		console.log(req.body);
		const { username, email, password, phoneNumber, name, country } = req.body;


		const user = await userSchema.findOne({ email });

		if (user) throw errorHandler('The email is registered', 409, {});

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = new userSchema({
			name: name,
			password: hashedPassword,
			email: email,
			phoneNumber: phoneNumber,
			username: username,
			country: {
				iso2: country.iso2,
				name: country.name
			}
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

const getLoggedUser = async (req, res, next) => {
	try {
		const user = await userSchema.findById(req.userId);

		if (!user) throw errorHandler('User not found', 404, {});

		res.status(200).json({ message: 'User found', user });
	} catch (error) {
		next(error);
	}
};

const authController = {
	postLogin,
	postSignup,
	getLoggedUser,
};

export default authController;
