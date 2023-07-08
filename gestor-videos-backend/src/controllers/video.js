import videoSchema from '../models/Video.js';
import groupSchema from '../models/Group.js';

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

const getVideosByUser = async (req, res, next) => {
	try {
		const videos = await videoSchema.find({ owner: req.userId });

		if (!videos) throw errorHandler('An error happened', 404, {});

		res.status(200).json({ message: 'Videos found', videos });
	} catch (err) {
		next(err);
	}
};

const getVideosByGroup = async (req, res, next) => {
	try {
		const { groupId } = req.query;

		if (groupId == '')
			return res
				.status(404)
				.json({ message: 'Group not found', videos: [] });

		const videos = await videoSchema.find({
			groupId: { $exists: true, $ne: null, $eq: groupId },
		});

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
		const { title, description, groupId } = req.body;
		const owner = req.userId;

		console.log('datos video: ', title, description, owner, groupId);

		if (!req.file) throw errorHandler('An image is required', 422, {});

		let newVideo;

		if (groupId != '') {
			console.log('saving as group', groupId);
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
			const group = await groupSchema.findById(groupId);

			for (const groupUser of group.users) {
				console.log(groupUser);
				if (groupUser.sendNotification) {
					const linkUrl =
						'http://localhost:4200/watch/' + newVideo._id;
					const content =
						'Se subio un nuevo video del  grupo: ' +
						group.name +
						', link: ' +
						linkUrl;
					const receiver = groupUser.userId;

					const savedNotification =
						await notificationController.saveNotification(
							content,
							receiver
						);
					console.log(savedNotification);
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
	getVideosByUser,
	getVideosByGroup,
};

export default videoController;
