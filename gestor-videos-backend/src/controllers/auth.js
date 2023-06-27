import userSchema from "../models/Usuario.js";

//Controller para gestionar la autenticacion usuarios normales

const postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    res.json(`Usuario: ${username} | Contraseña: ${password}`);
  } catch (err) {
    res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    console.log(err);
  }
};

const postSignup = async (req, res, next) => {
  try {
    const { nombre, password, correo, telefono, username } = req.body;

    const newUser = new userSchema({
      nombre: nombre,
      password: password,
      correo: correo,
      telefono: telefono,
      username: username,
    });

    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Ocurrio un error, pruebe mas tarde" });
    console.log(err);
  }
};

const authController = {
  postLogin,
  postSignup,
};

export default authController;
