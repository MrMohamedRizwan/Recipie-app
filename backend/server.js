const express = require("express");
const dotenv = require("dotenv");

const UserRoutes = require("./routes/UserRoute.js");
const RecipieRoutes = require("./routes/RecipieRoutes.js");
const color = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const connectToDB = require("./config/db");
const app = express();
const bodyParser=require('body-parser')
dotenv.config();

connectToDB();
app.use(cors({
	origin: '*', // Allow all origins
	methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
	allowedHeaders: ['*'] // Allowed headers
  }));
app.use(express.json());
console.log(process.env.MONGO_URI);
app.use(morgan("dev"));
const port = process.env.PORT;
const path = require("path");
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use("/api/user", UserRoutes);
app.use("/api/recipe", RecipieRoutes);
app.listen(port, () =>
	console.log(`Server running on port ${port}`.yellow.bold),
);
const __dirname1 = path.resolve();

if (1) {
	app.use(express.static(path.join(__dirname1, "/frontend/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html")),
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running..");
	});
}
