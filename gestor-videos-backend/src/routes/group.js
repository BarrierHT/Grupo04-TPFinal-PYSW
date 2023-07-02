import express from 'express';
import groupController from '../controllers/group.js';

const router = express.Router();

router.get('/get-group/:id', groupController.getGroup);
router.get('/get-groups', groupController.getGroups);

router.post('/add-group', groupController.postGroup);
router.put('/add-user-to-group', groupController.addUserToGroup);

//exportamos el modulo de rutas

export default router;
