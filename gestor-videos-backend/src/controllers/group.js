import groupSchema from "../models/Group.js";
import { errorHandler } from "../utils/errorHandler.js";

//Controller para gestionar los grupos de usuarios (nueva funcionalidad)

const getGroup = async (req, res, next) => {
  try {
    const { id } = req.params;

    const groupFound = await groupSchema.findById({ _id: id });

    if (!groupFound) throw errorHandler("The group does not exist", 404, {});

    res.json(groupFound);
  } catch (err) {
    next(err);
  }
};

const getGroups = async (req, res, next) => {
  try {
    const { pattern } = req.query;

    // Utilizamos una expresión regular para buscar los grupos que contengan el patrón
    const regexPattern = new RegExp(pattern, "i");
    const groups = await groupSchema.find({ name: regexPattern });

    if (!groups) throw errorHandler("An error happened", 404, {});

    res.status(200).json({ message: "Groups found", groups });
  } catch (err) {
    next(err);
  }
};

const postGroup = async (req, res, next) => {

  try {
    const { name, description, owner } = req.body;

    const newGroup = new groupSchema({
      name: name,
      description: description,
      owner: owner,
      users: [
        {
          dateOfJoining: Date.now(),
          sendNotification: false,
          sendEmailNotification: false,
          _id: owner,
        },
      ],
    });

    if (!newGroup) throw errorHandler("An error happened", 404, {});

    await newGroup.save();
    res.status(200).json({ message: "Group created" });
  } catch (err) {
    next(err);
  }
};

const addUserToGroup = async (req, res, next) => {
  try {
    const { groupId, userId } = req.body;

    const updatedGroup = await groupSchema.findByIdAndUpdate(
      groupId,
      {
        $push: {
          users: {
            dateOfJoining: Date.now(),
            sendNotification: false,
            sendEmailNotification: false,
            _id: userId,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "User added to group", group: updatedGroup });
  } catch (err) {
    next(err);
  }
};

const groupController = {
  getGroup,
  postGroup,
  getGroups,
  addUserToGroup
};

export default groupController;
