import channelSchema from '../models/Canal.js'

//Controller para gestionar los canales de los usuarios (devolveran enlaces a sus playlists, videos, info del usuario)

const getChannel = (req, res, next) => {

	try {
		const { id } = req.params;

		const channelFound = channelSchema.findById({_id: id});

		if(!channelFound) return res.status(404).json({ message: "El canal no existe" });

		res.json(channelFound);

	} catch (err) {
		res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
		console.log(err);
	}

};

const channelController = {
	getChannel,
};

export default channelController;
