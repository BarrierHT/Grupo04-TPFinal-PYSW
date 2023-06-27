import groupSchema from "../models/Grupo.js";

//Controller para gestionar los grupos de usuarios (nueva funcionalidad)

const getGroup = async (req, res, next) => {
	try {
		
		const { id } = req.params;

		const groupFound = await groupSchema.findById({ _id: id });

		if(!groupFound) return res.status(404).json({ message: "El grupo no existe" });

		res.json(groupFound);

	} catch (err) {
		res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    	console.log(err);
	}
};

const postGroup = async (req, res, next) => {
	try {
		
		const { nombre } = req.body;

		const newGroup = new groupSchema({
			nombre: nombre,
		})

		await newGroup.save();
		res.json(newGroup)

	} catch (err) {
		res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    	console.log(err);
	}
};

const groupController = {
	getGroup,
	postGroup,
};

export default groupController;
