const app = require("express");
const { registerUser, authUser, checkAdmin } = require("../controllers/userController");
const router = app.Router();
router.route("/").post(registerUser);
// router.post('/',registerUser)

router.post("/login", authUser);

router.get('/admin',checkAdmin);

module.exports = router;
