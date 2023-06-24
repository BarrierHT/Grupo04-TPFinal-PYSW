import morgan from 'morgan';
import express from 'express';

import './utils/db.js';
import './utils/start.js';

import authRoutes from './routes/auth.js';
import videoRoutes from './routes/video.js';
import userRoutes from './routes/user.js';
import notificationRoutes from './routes/notification.js';

/* Initializations */

const morganFormat =
	':body :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms';

const app = express();

app.set('port', process.env.PORT || 8080);

/* Middlewares */

app.use(express.json());
app.use(morgan(morganFormat));

/* Routes */

app.use('/auth', authRoutes);
app.use('/videos', videoRoutes);
app.use('/users', userRoutes);
app.use('/notifications', notificationRoutes);

app.use((err, req, res, next) => {
	console.log('Error(middleware): ', err);
	const status = err.statusCode || 500;
	const message = err.message || 'Server error';
	const data = err.data || {};
	return res.status(status).json({ message, data });
});

app.listen(app.get('port'));
console.log('Server on port 8080');
