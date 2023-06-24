import express from 'express';
import videoController from '../controllers/video.js';
import { isAuth } from '../middlewares/is-Auth.js';

import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

import { S3 } from '@aws-sdk/client-s3';

import maintenance_mode_message from 'aws-sdk/lib/maintenance_mode_message.js';
maintenance_mode_message.suppress = true;

// console.log(AWS);

AWS.config.update({
	secretAccessKey: process.env.SECRET_KEY_AWS,
	accessKeyId: process.env.ACCESS_KEY_AWS,
	region: process.env.REGION_AWS,
});

const s3 = new S3();

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/mp4') cb(null, true);
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
	// limits: { fileSize: 3145728 },
	// Definir limites de subida
});

const router = express.Router();

router.get('/get-videos', videoController.getVideos);
router.get('/get-video/:videoId', videoController.getVideo);

router.post('/add-video', videoController.postVideo);

// router.post('/add-video', upload.single('video'), videoController.postVideo);

//Exportamos el modulo de rutas

export default router;
