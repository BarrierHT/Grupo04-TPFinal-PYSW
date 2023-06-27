import express from 'express';
import groupController from '../controllers/group.js';

const router = express.Router();

router.get('/get-group', groupController.getGroup);
router.get('/add-group', groupController.postGroup);

//exportamos el modulo de rutas

export default router;
