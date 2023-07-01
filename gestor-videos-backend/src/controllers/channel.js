import channelSchema from '../models/Channel.js';
import { errorHandler } from '../utils/errorHandler.js';

//Controller para gestionar los canales de los usuarios (devolveran enlaces a sus playlists, videos, info del usuario)

const getChannel = async (req, res, next) => {
	try {
		const { id } = req.params;

		const channelFound = await channelSchema
			.findById({ _id: id })
			.populate('owner');

		if (!channelFound)
			throw errorHandler('The channel does not exist', 404, {});

		res.json(channelFound);
	} catch (err) {
		next(err);
	}
};

const channelController = {
	getChannel,
};

export default channelController;
