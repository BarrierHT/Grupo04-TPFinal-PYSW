import mongoose from 'mongoose';

(async () => {
	try {
		await mongoose.connect('mongodb://127.0.0.1/gestionvideos', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB Connection successful');
	} catch (err) {
		console.log(err);
	}
})();
