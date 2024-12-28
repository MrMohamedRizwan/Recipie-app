const express = require("express");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const sharp = require("sharp");
const expressAsyncHandler = require("express-async-handler");
const Recipe = require("../models/RecipieModel"); // Adjust the path as necessary
const { default: Redis } = require("ioredis");
const connectToRedis = require("../config/redis");

const app = express();

// AWS S3 Configuration
AWS.config.update({
	accessKeyId: process.env.AWS_SECUREKEY,
	secretAccessKey: process.env.AWS_SECRETKEY,
	region: process.env.AWS_LOCATION,
});
const s3 = new AWS.S3();

// Multer configuration for file uploads
const storage = multer.memoryStorage(); // Use memory storage to handle file as buffer
const upload = multer({
	storage,
	limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API endpoint to create a recipe
const Createrecipie = expressAsyncHandler(async (req, res) => {
	try {
		// Handle file upload with multer
		upload.single("image")(req, res, async (err) => {
			if (err) {
				return res.status(400).json({ error: "Error uploading image" });
			}

			const { title, ingredients, instructions } = req.body;
			const imageFile = req.file;

			if (!title || !ingredients || !instructions) {
				return res.status(400).json({ message: "All fields are required" });
			}

			let imageUrl = null;

			if (imageFile) {
				try {
					const imageBuffer = await sharp(imageFile.buffer)
						.toFormat("jpg")
						.toBuffer();

					const name = title.split(" ").join("");
					const s3Key = `${name}.jpg`;

					const params = {
						Bucket: "presidiobucket", // Your bucket name
						Key: s3Key,
						Body: imageBuffer,
						ContentType: "image/jpeg",
					};
					console.log(process.env.AWS_SECUREKEY);
					console.log(process.env.AWS_SECRETKEY);

					const data = await s3.upload(params).promise();
					imageUrl = data.Location; // URL of the uploaded image
				} catch (uploadError) {
					console.error(`Upload to S3 failed: ${uploadError.message}`);
					return res
						.status(500)
						.json({ message: "Error uploading image to S3" });
				}
			}

			const newRecipe = new Recipe({
				title,
				ingredients,
				instructions,
				image: imageUrl,
			});

			await newRecipe.save();

			res.status(201).json({
				message: "Recipe created successfully",
				recipe: newRecipe,
			});
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
	return { message: "fbieygfu" };
});
const fetchAllRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find({});
		console.log(recipes);
		res.send(recipes);
	} catch (error) {
		console.error("Error fetching recipes:", error);
	}
};
const particularrecipie = async (req, res) => {
	try {
		let recipeId = req.params.id;

		// Trim any leading or trailing whitespace
		recipeId = recipeId.trim();

		// Check if the ID is a valid ObjectId
		// if (!mongoose.Types.ObjectId.isValid(recipeId)) {
		//     return res.status(400).json({ message: 'Invalid recipe ID format' });
		// }
		const getValuefromRedis = await connectToRedis.get(recipeId);
		if (getValuefromRedis) {
			// console.log(getValuefromRedis);
			// res.json({ message: "From Redis" })
			res.json(getValuefromRedis);
		}
		else {

			const recipe = await Recipe.findById(recipeId);

			// console.log(JSON.stringify(recipe));

			if (!recipe) {
				return res.status(404).json({ message: 'Recipe not found' });
			}
			await connectToRedis.set(recipeId, recipe, 'EX', 3600);
			// else

			// res.json({ message: "From DB" });
			res.json(recipe);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};


module.exports = { Createrecipie, fetchAllRecipes, particularrecipie };
