const mongoose = require("mongoose");

const connectToDB = async () => {
	try {
		console.log(process.env.MONGO_URI);
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB Connected".cyan.underline.bold);
	} catch (e) {
		console.log(e);
		process.exit();
	}
};
module.exports = connectToDB;
