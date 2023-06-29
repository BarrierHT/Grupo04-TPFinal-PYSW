import userSchema from '../models/Usuario.js';

//Controller para gestionar usuarios, gestores y administradores(distinto de auth)

const getUsers = async (req, res, next) => {
	try {
		const users = await userSchema.find();

		if (users.length === 0)
			return res.status(404).json({ message: 'No hay usuarios' });

		res.json(users);
	} catch (err) {
		res.status(500).json({ message: 'Ocurrio un error, pruebe mas tarde' });
		console.log(err);
	}
};

const getUser = async (req, res, next) => {
	try {
		const { userId } = req.body;
		const user = await userSchema.findOne({ _id: userId });

		if (!user)
			return res.status(404).json({ message: 'No existe el usuario' });

		res.json(user);
	} catch (error) {
		console.log(error);
	}
};

const userController = {
	getUsers,
	getUser,
};

export default userController;
