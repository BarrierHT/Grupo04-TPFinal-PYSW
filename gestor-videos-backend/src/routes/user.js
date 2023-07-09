import express from 'express';
import userController from '../controllers/user.js';
import { isAuth } from '../middlewares/is-Auth.js';

const router = express.Router();

router.get('/get-users', isAuth, userController.getUsers);
router.get('/get-user/:userId',isAuth, userController.getUser);
router.delete('/delete-user/:userId', isAuth, userController.deleteUser);
router.put('/update-user/:userId', isAuth, userController.updateUser);
router.post('/create-user', isAuth, userController.addUser);

export default router;
