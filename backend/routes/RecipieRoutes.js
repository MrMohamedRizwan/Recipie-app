const multer = require("multer");
const app = require("express");
const {
	Createrecipie,
	fetchAllRecipes,
	particularrecipie,
	// allRecipies,
} = require("../controllers/RecipieController");
const { protect } = require("../middleware/authuMiddleware");
const { checkAdmin } = require("../controllers/userController");

const router = app.Router();
router.post("/createRecipes",protect,checkAdmin, Createrecipie);
router.get("/allRecipies", protect,fetchAllRecipes);
// const upload = multer({ dest: 'uploads/' });
router.get("/:id",protect, particularrecipie);

const upload = multer({
	limits: { fileSize: 50 * 1024 * 1024 }, // Set file size limit to 50MB
});

// app.use(cors());

// Route to handle file uploads
router.post('/ccrec', upload.single('image'), (req, res) => {
  const { title, ingredients, instructions } = req.body;

  const imageFile = req.File; // Access the uploaded file

  const payload = {
    title,
    ingredients,
    instructions,
    image: imageFile, // File object
  };

//   console.log(payload);
console.log(payload);
  res.send(payload);
});
module.exports = router;
