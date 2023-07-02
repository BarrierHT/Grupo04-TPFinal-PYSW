import morgan from 'morgan';
import express from 'express';
import cors from 'cors';

import './utils/start.js';
import './utils/db.js';

import authRoutes from './routes/auth.js';
import videoRoutes from './routes/video.js';
import channelRoutes from './routes/channel.js';
import groupRoutes from './routes/group.js';
import reportRoutes from './routes/report.js';
import ratingRoutes from './routes/rating.js';
import playlistRoutes from './routes/playlist.js';
import userRoutes from './routes/user.js';
import notificationRoutes from './routes/notification.js';

/* Initializations */

// const morganFormat =
// 	':body :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms';

const app = express();

app.set('port', process.env.PORT || 8080);

/* Middlewares */
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

/* Routes */

app.use('/auth', authRoutes);

app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use('/channel', channelRoutes);
app.use('/notification', notificationRoutes);

app.use('/video', videoRoutes);
app.use('/rating', ratingRoutes);
app.use('/report', reportRoutes);
app.use('/playlist', playlistRoutes);

/* Manejar Errores */
app.use((err, req, res, next) => {
	console.log('Error(middleware): ', err);
	const status = err.statusCode || 500;
	const message = err.message || 'Server error';
	const data = err.data || {};
	return res.status(status).json({ message, data });
});

/* Correr Servidor */

app.listen(app.get('port'));
console.log('Server on port 8080');
