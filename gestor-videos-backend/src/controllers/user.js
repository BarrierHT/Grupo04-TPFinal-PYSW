import userSchema from "../models/Usuario.js";

//Controller para gestionar usuarios, gestores y administradores(distinto de auth)

const getUsers = async (req, res, next) => {
  try {
    const users = await userSchema.find();

    if (users.length === 0)
      return res.status(404).json({ message: "No hay usuarios" });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    console.log(err);
  }
};

const userController = {
  getUsers,
};

export default userController;
