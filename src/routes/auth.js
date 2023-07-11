import express from 'express';
import authController from '../controllers/auth.js';
import { isAuth } from '../middlewares/is-Auth.js';

const router = express.Router();

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);
router.get('/loggedUser', isAuth, authController.getLoggedUser);

//exportamos el modulo de rutas
export default router;
