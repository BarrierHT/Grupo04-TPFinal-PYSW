import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

import userSchema from '../models/User.js';
import videoSchema from '../models/Video.js';
import groupSchema from '../models/Group.js';
import playlistSchema from '../models/Playlist.js';
import channelSchema from '../models/Channel.js';
import notificationSchema from '../models/Notification.js';
import ratingSchema from '../models/Rating.js';
import reportSchema from '../models/Report.js';

import { errorHandler } from '../utils/errorHandler.js';

const client = new S3Client({
	region: process.env.REGION_AWS,
	credentials: {
		accessKeyId: process.env.ACCESS_KEY_AWS,
		secretAccessKey: process.env.SECRET_KEY_AWS,
	},
	apiVersion: '2006-03-01',
});
//Controller para gestionar usuarios, gestores y administradores(distinto de auth)

const getUsers = async (req, res, next) => {
	try {
		const users = await userSchema.find();

		if (users.length === 0) throw errorHandler('No users', 404, {});

		res.json(users);
	} catch (err) {
		next(err);
	}
};

const getUser = async (req, res, next) => {
	try {
		const user = await userSchema.findOne({ _id: req.userId });

		if (!user) throw errorHandler('The user does not exist', 404, {});

		res.json(user);
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const userId = req.params.userId;

		// Verificar si el usuario tiene videos
		const videos = await videoSchema.find({ owner: userId });
		const hasVideos = videos.length > 0;

		if (hasVideos) {
			// Borrar videos de Amazon, listas de reproducción, reportes y ratings
			for (const video of videos) {
				//ToDo eliminar video de amazon
				const input = {
					// DeleteObjectRequest
					Bucket: process.env.BUCKET_AWS, // required
					Key: decodeURIComponent(video.url.split('.com/')[1]), // required
				};

				console.log(input);

				const command = new DeleteObjectCommand(input);
				const response = await client.send(command);

				if (response) console.log('deleted from amazon: ', response);

				await playlistSchema.updateMany(
					{ 'videos.videoId': video._id },
					{ $pull: { videos: { videoId: video._id } } }
				);

				await reportSchema.deleteMany({ videoId: video._id });

				await ratingSchema.deleteMany({ videoId: video._id });
			}

			// Borrar videos
			await videoSchema.deleteMany({ owner: userId });
		}

		// Borrar canal
		await channelSchema.deleteMany({ owner: userId });

		// Borrar grupos propiedad
		await groupSchema.deleteMany({ owner: userId });

		// Actualizar grupos vinculados
		await groupSchema.updateMany(
			{ 'users.userId': userId },
			{ $pull: { users: { userId } } }
		);

		// Borrar notificaciones
		await notificationSchema.deleteMany({
			$or: [{ receiver: userId }, { sender: userId }],
		});

		// Borrar listas de reproducción
		await playlistSchema.deleteMany({ owner: userId });

		// Borrar ratings dados
		await ratingSchema.deleteMany({ 'users.userId': userId });

		// Borrar usuario
		const deletedUser = await userSchema.findByIdAndRemove(userId);

		if (!deletedUser) {
			throw errorHandler('The user does not exist', 404, {});
		}

		res.json({ message: 'User deleted successfully' });
	} catch (err) {
		next(err);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		const updatedUser = req.body;

		const user = await userSchema.findByIdAndUpdate(userId, updatedUser, {
			new: true,
		});

		if (!user) {
			throw errorHandler('The user does not exist', 404, {});
		}

		res.json({ message: 'User updated successfully', user: user });
	} catch (err) {
		next(err);
	}
};

const addUser = async (req, res, next) => {
	try {
		const userData = req.body;
		const newUser = new userSchema(userData);
		const savedUser = await newUser.save();

		res.json({ message: 'User created successfully', user: savedUser });
	} catch (err) {
		next(err);
	}
};

const userController = {
	getUsers,
	getUser,
	deleteUser,
	updateUser,
	addUser,
};

export default userController;
