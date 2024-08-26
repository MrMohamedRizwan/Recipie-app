const generateToken = require("../config/generateToke");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please fill all the fields");
	}
	const UserExists = await User.findOne({ email });
	if (UserExists) {
		res.status(400);
		throw new Error("User already exists");
	}
	const user = await User.create({
		name,
		email,
		password,
	});
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
            role:user.role,
			token: generateToken(user._id,user.role),
		});
	} else {
		res.status(400);
		throw new Error("Failed to create user data");
	}

	res.send({
		name,
		email,
		password,
	});
});

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	console.log("email", email, password);
	if (!email || !password) {
		res.status(400);
		throw new Error("Please fill all the fields");
	}
	const user = await User.findOne({ email });
	console.log(user);
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
            role:user.role,
			token: generateToken(user._id,user.role),
		});
		// res.send("Login Successful");
	} else {
		res.status(400);
		throw new Error("Invalid email or password");
	}
});

const checkAdmin = async (req, res) => {
	try {
	  // Assuming user information is available in req.user after authentication
	  const user = req.user;
  
	  // Fetch user details from the database
	  const foundUser = await User.findById(user.id);
  
	  if (!foundUser) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  // Check if the user is an admin
	  if (foundUser.isAdmin) {
		return res.json({ isAdmin: true });
	  } else {
		return res.json({ isAdmin: false });
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Server error' });
	}
  };
  
module.exports = { registerUser, authUser,checkAdmin };
