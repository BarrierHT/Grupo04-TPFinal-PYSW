import mongoose from 'mongoose';

(async () => {
	try {
		const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.qmwzndr.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
		console.log(uri);
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			maxPoolSize: 10,
		});
		console.log('MongoDB Connection successful');
	} catch (err) {
		console.log(err);
	}
})();
