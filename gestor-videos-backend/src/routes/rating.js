import express from 'express';
import ratingController from '../controllers/rating.js';
import { isAuth } from '../middlewares/is-Auth.js';

const router = express.Router();

router.get('/get-rating/:videoId', isAuth, ratingController.getRating);
router.put('/add-rating/:videoId', isAuth, ratingController.postRating);

//exportamos el modulo de rutas

export default router;
