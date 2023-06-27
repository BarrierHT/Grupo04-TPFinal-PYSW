import express from 'express';
import reportController from '../controllers/report.js';

const router = express.Router();

router.get('/get-report', reportController.getReport);
router.get('/add-report', reportController.postReport);

//exportamos el modulo de rutas

export default router;
