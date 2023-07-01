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

const postGroup = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newGroup = new groupSchema({
      name: name,
    });

    await newGroup.save();
    res.status(200).json({ message: 'Group created' });

  } catch (err) {
    next(err);
  }
};

const groupController = {
  getGroup,
  postGroup,
};

export default groupController;
