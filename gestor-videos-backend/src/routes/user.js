import express from 'express';
import userController from '../controllers/user.js';
import { isAuth } from '../middlewares/is-Auth.js';
import { isAdmin } from '../middlewares/is-Admin.js';

const router = express.Router();

router.get('/get-users', isAuth, isAdmin, userController.getUsers);
router.get('/get-user/:userId', isAuth, isAdmin, userController.getUser);
router.delete(
	'/delete-user/:userId',
	isAuth,
	isAdmin,
	userController.deleteUser
);
router.put('/update-user/:userId', isAuth, isAdmin, userController.updateUser);
router.post('/create-user', isAuth, isAdmin, userController.addUser);

export default router;
