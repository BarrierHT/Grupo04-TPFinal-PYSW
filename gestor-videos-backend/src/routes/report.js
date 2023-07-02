import express from 'express';
import reportController from '../controllers/report.js';
import { isAuth } from '../middlewares/is-Auth.js';

const router = express.Router();

router.get('/get-report/:id', isAuth, reportController.getReport);
router.get('/get-reports', isAuth, reportController.getReports);

router.post('/add-report', isAuth, reportController.postReport);
router.put('/review-report', isAuth, reportController.putReviewReport);

//exportamos el modulo de rutas

export default router;
