import express from 'express';
import reportController from '../controllers/report.js';

const router = express.Router();

router.get('/get-report/:id', reportController.getReport);
router.get('/get-reports', reportController.getReports);

router.post('/add-report', reportController.postReport);
router.put('/review-report', reportController.putReviewReport);

//exportamos el modulo de rutas

export default router;
