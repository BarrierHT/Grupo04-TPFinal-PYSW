import groupSchema from '../models/Group.js';
import { errorHandler } from '../utils/errorHandler.js';

//Controller para gestionar los grupos de usuarios (nueva funcionalidad)

const getGroup = async (req, res, next) => {
	try {
		const { id } = req.params;

		const groupFound = await groupSchema.findById({ _id: id });

		if (!groupFound)
			throw errorHandler('The group does not exist', 404, {});

		res.json(groupFound);
	} catch (err) {
		next(err);
	}
};

const getGroups = async (req, res, next) => {
	try {
		const { pattern } = req.query;

		// Utilizamos una expresión regular para buscar los grupos que contengan el patrón
		const regexPattern = new RegExp(pattern, 'i');
		const groups = await groupSchema.find({ name: regexPattern });

		if (!groups) throw errorHandler('An error happened', 404, {});

		const groupsToSend = groups.map(group => {
			const userExists = group.users.some(
				user => user.userId.toString() == req.userId
			);
			const groupObject = group.toObject();

			if (userExists) groupObject.isUserJoined = true;
			else groupObject.isUserJoined = false;

			delete groupObject.users;

			return groupObject;
		});

		res.status(200).json({ message: 'Groups found', groups: groupsToSend });
	} catch (err) {
		next(err);
	}
};

const getGroupsByOwner = async (req, res, next) => {
	try {
		const groups = await groupSchema.find({ owner: req.userId });

		if (!groups) throw errorHandler('An error happened', 404, {});

		res.status(200).json({ message: 'Groups found', groups });
	} catch (err) {
		next(err);
	}
};

const getGroupsByUser = async (req, res, next) => {
	try {
		const groups = await groupSchema.find({ 'users.userId': req.userId });

		if (!groups) throw errorHandler('An error happened', 404, {});

		const groupsToSend = groups.map(group => {
			const groupObject = group.toObject();

			delete groupObject.users;

			return groupObject;
		});

		res.status(200).json({ message: 'Groups found', groups: groupsToSend });
	} catch (err) {
		next(err);
	}
};

const postGroup = async (req, res, next) => {
	try {
		const { name, description } = req.body;

		const owner = req.userId;

		const newGroup = new groupSchema({
			name: name,
			description: description,
			owner: owner,
			users: [],
		});
		if (!newGroup) throw errorHandler('An error happened', 404, {});

		newGroup.users.push({
			dateOfJoining: Date.now(),
			sendNotification: false,
			sendEmailNotification: false,
			userId: owner,
		});

		//Ingresar al owner como integrante

		await newGroup.save();
		res.status(200).json({ message: 'Group created' });
	} catch (err) {
		next(err);
	}
};

const postAddUserToGroup = async (req, res, next) => {
	try {
		const { groupId } = req.body;
		const userId = req.userId;

		const group = await groupSchema.findById(groupId);

		if (!group) {
			throw errorHandler('Group not found', 404, {});
		}

		const userExists = group.users.some(
			user => user._id.toString() == userId
		);

		if (userExists) throw errorHandler('User already in group', 400, {});

		group.users.push({
			dateOfJoining: Date.now(),
			sendNotification: false,
			sendEmailNotification: false,
			userId,
		});

		const updatedGroup = await group.save();

		res.status(200).json({
			message: 'User added to group',
			group: updatedGroup,
		});
	} catch (err) {
		next(err);
	}
};

const groupController = {
	getGroup,
	postGroup,
	getGroups,
	postAddUserToGroup,
	getGroupsByOwner,
	getGroupsByUser,
};

export default groupController;
