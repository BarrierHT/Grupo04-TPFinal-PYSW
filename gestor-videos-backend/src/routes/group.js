import express from 'express';
import groupController from '../controllers/group.js';

const router = express.Router();

router.get('/get-group/:id', groupController.getGroup);
router.post('/add-group', groupController.postGroup);

//exportamos el modulo de rutas

export default router;
