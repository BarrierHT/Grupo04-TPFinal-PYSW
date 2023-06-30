import reportSchema from '../models/Report.js';
import { errorHandler } from '../utils/errorHandler.js';

//Controller para gestionar reclamos sobre un video

const getReport = async (req, res, next) => {
	try {
		const { id } = req.params;

		const reportFound = await reportSchema.findById({ _id: id });

		if (!reportFound)
			throw errorHandler('The report does not exist', 404, {});
		res.json(reportFound);
	} catch (err) {
		next(err);
	}
};

const getReports = async (req, res, next) => {
	try {
		const reports = await reportSchema.find();

		if (!reports) throw errorHandler('fail retrieving reports', 404, {});
		res.status(200).json({ message: 'reports found', reports });
	} catch (err) {
		next(err);
	}
};

const postReport = async (req, res, next) => {
	try {
		const { title, reason, videoId } = req.body;

		console.log(req.body);

		const newReport = new reportSchema({
			title,
			reason,
			videoId,
		});

		if (!newReport)
			throw errorHandler('An error with the report happened', 400, {});

		await newReport.save();

		res.status(200).json({ message: 'Report added' });
	} catch (err) {
		next(err);
	}
};

const reportController = {
	getReport,
	postReport,
	getReports,
};

export default reportController;
