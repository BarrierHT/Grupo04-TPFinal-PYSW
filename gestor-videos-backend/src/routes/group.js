import express from 'express';
import groupController from '../controllers/group.js';
import { isAuth } from '../middlewares/is-Auth.js';

const router = express.Router();

router.get('/get-group/:id', isAuth, groupController.getGroup);
router.get('/get-groups', isAuth, groupController.getGroups);

router.post('/add-group', isAuth, groupController.postGroup);

router.get('/get-groups-owner-user', isAuth, groupController.getGroupsByOwner);
// LLamar cuando se solicite unirse

router.get('/get-groups-user', isAuth, groupController.getGroupsByUser);
router.put('/add-user-to-group', isAuth, groupController.postAddUserToGroup);

//exportamos el modulo de rutas

export default router;
