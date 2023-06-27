import express from 'express';
import ratingController from '../controllers/rating.js';

const router = express.Router();

router.get('/get-rating', ratingController.getRating);
router.get('/add-rating', ratingController.postRating);

//exportamos el modulo de rutas

export default router;
