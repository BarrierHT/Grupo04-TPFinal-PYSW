import express from 'express';
import authController from '../controllers/auth.js';

const router = express.Router();

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);

//exportamos el modulo de rutas
export default router;
