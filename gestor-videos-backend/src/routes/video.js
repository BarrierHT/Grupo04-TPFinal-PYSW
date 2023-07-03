import express from 'express';
import videoController from '../controllers/video.js';
import { isAuth } from '../middlewares/is-Auth.js';

import multer from 'multer';
import multerS3 from 'multer-s3';

import { v4 as uuidv4 } from 'uuid';

import { S3Client } from '@aws-sdk/client-s3';

import maintenance_mode_message from 'aws-sdk/lib/maintenance_mode_message.js';
maintenance_mode_message.suppress = true;

let s3 = new S3Client({
	region: process.env.REGION_AWS,
	credentials: {
		accessKeyId: process.env.ACCESS_KEY_AWS,
		secretAccessKey: process.env.SECRET_KEY_AWS,
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'video/mp4') cb(null, true);
	else cb(new Error('mimetype not allowed'), false);
};

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.BUCKET_AWS,
		acl: 'public-read',
		metadata: function (req, file, cb) {
			cb(null, { fieldName: 'uploading_of_videos_app' });
		},
		key: function (req, file, cb) {
			cb(null, uuidv4() + '-' + file.originalname);
		},
	}),
	fileFilter,
	limits: { fileSize: 50 * 1024 * 1024 },
	// Definir limites de subida
});

const router = express.Router();

router.get('/get-videos', videoController.getVideos);
router.get('/get-video/:videoId', videoController.getVideo);

router.post(
	'/add-video',
	isAuth,
	upload.single('file'),
	videoController.postVideo
);
// router.post('/add-video', , videoController.postVideo);

//Exportamos el modulo de rutas

export default router;
