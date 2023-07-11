import express from 'express';
import reportController from '../controllers/report.js';
import { isAuth } from '../middlewares/is-Auth.js';
import { isGestor } from '../middlewares/is-Gestor.js';

const router = express.Router();

router.get('/get-report/:id', isAuth, isGestor, reportController.getReport);
router.get('/get-reports', isAuth, isGestor, reportController.getReports);

router.post('/add-report', isAuth, reportController.postReport);
router.put(
	'/review-report',
	isAuth,
	isGestor,
	reportController.putReviewReport
);

//exportamos el modulo de rutas

export default router;
