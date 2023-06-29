import userSchema from '../models/Usuario.js';
import { errorHandler } from '../utils/errorHandler.js';
import bcrypt from 'bcryptjs';

//Controller para gestionar la autenticacion usuarios normales

const postLogin = async (req, res, next) => {
	const { email, password } = req.body;

	console.log(email, password);

	let loadedUser = null;

	return userSchema
		.findOne({ email })
		.then(user => {
			if (!user)
				throw errorHandler(
					'A user with this email was not found',
					401,
					{}
				);
			loadedUser = user;
			//ToDo return bcrypt.compare(password, user.password);
			return password === user.password;
		})
		.then(hasMatch => {
			if (!hasMatch)
				throw errorHandler(
					'A user with this password was not found',
					401,
					{}
				);
			const token = jwt.sign(
				{ email, userId: loadedUser._id.toString() },
				process.env.SECRET_JWT_AUTHENTICATION,
				{ expiresIn: '1h' }
			);

			return res.status(200).json({
				message: 'User logged correctly!',
				token,
				userId: loadedUser._id.toString(),
			});
		})
		.catch(err => {
			err.statusCode = 500;
			next(err);
			return err;
		});
};

const postSignup = async (req, res, next) => {
	try {
		const { nombre, password, correo, telefono, username } = req.body;

		const newUser = new userSchema({
			nombre: nombre,
			password: password,
			correo: correo,
			telefono: telefono,
			username: username,
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
