import userSchema from '../models/User.js';
import videoSchema from "../models/Video.js";
import groupSchema from "../models/Group.js";
import playlistSchema from "../models/Playlist.js";
import channelSchema from "../models/Channel.js";
import notificationSchema from "../models/Notification.js";
import ratingSchema from "../models/Rating.js";

import { errorHandler } from '../utils/errorHandler.js';

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

	  await channelSchema.deleteMany({ owner: userId });
	  await groupSchema.deleteMany({ owner: userId });
	  await groupSchema.updateMany(
		{ 'users.userId': userId },
		{ $pull: { users: { userId: userId } } }
	  );
	  await notificationSchema.deleteMany({ $or: [{ receiver: userId }, { sender: userId }] });
	  await playlistSchema.deleteMany({ owner: userId });
	  await videoSchema.deleteMany({ owner: userId });
	  await ratingSchema.deleteMany({ 'users.userId': userId });
  
	 
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
