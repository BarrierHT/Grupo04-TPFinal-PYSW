import express from 'express';
import userController from '../controllers/user.js';
import { isAuth } from '../middlewares/is-Auth.js';

const router = express.Router();

router.get('/get-users', isAuth, userController.getUsers);

//exportamos el modulo de rutas

export default router;
