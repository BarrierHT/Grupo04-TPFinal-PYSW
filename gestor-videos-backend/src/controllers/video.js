import videoSchema from '../models/Video.js';
import groupSchema from '../models/Group.js';
import userSchema from '../models/User.js';

import notificationController from '../controllers/notification.js';

import { errorHandler } from '../utils/errorHandler.js';

//Controller para gestionar videos (funciones CRUD y similares)

const getVideos = async (req, res, next) => {
	try {
		const { pattern } = req.query;

		console.log('patt: ', pattern);

		const regexPattern = new RegExp(pattern, 'i');
		const videos = await videoSchema
			.find({ title: regexPattern })
			.populate('owner');

		if (!videos) throw errorHandler('An error happened', 404, {});

		res.status(200).json({ message: 'Videos found', videos });
	} catch (err) {
		next(err);
	}
};

const getVideo = async (req, res, next) => {
	try {
		const { videoId } = req.params;

		const videoFound = await videoSchema
			.findById(videoId)
			.populate('owner');

		if (!videoFound)
			throw errorHandler('The video does not exist', 404, {});

		res.json({ message: 'video found', video: videoFound });
	} catch (err) {
		next(err);
	}
};

const postVideo = async (req, res, next) => {
	try {
		const { title, description, groupId, owner } = req.body;

		console.log(title, description, owner, groupId);

		if (!req.file) throw errorHandler('An image is required', 422, {});

		let newVideo;

		if (groupId != '') {
			newVideo = new videoSchema({
				title,
				description,
				url: req.file.location,
				owner,
				groupId,
			});
			//Registrar como grupo, owner sigue siendo quien lo subio (integrante del grupo)
		} else {
			newVideo = new videoSchema({
				title,
				description,
				url: req.file.location,
				owner,
			});
			//Registrar como usuario
		}

		if (!newVideo) throw errorHandler('An error ocurred', 400, {});

		await newVideo.save();

		if (groupId != '') {
			const group = await groupSchema
				.findById(groupId)
				.select('name users');

			for (const groupUser of group.users) {
				if (groupUser.sendEmailNotification) {
					const user = await userSchema
						.findById(req.userId)
						.select('email');
					notificationController.sendEmailNotification(
						{
							data: 'Nuevo video del grupo : ' + group.name,
							url: req.file.location,
						},
						user.email
					);
				}
			}
		}

		res.status(200).json({
			message: 'Video uploaded',
			videoId: newVideo._id,
		});
	} catch (err) {
		next(err);
	}
};

const videoController = {
	getVideos,
	getVideo,
	postVideo,
};

export default videoController;
