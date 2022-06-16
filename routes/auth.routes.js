const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const saltRounds = 10;

// SignUp route
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Checking if email is an empty string
    if (!email) {
      res.status(400).json({ message: "Email cannot be empty" });
      return;
    }

    //Checking if email already exist
    const emailFound = await User.findOne({ email });
    if (emailFound) {
      res.status(400).json({ message: `Email already exists` });
      return;
    }

    // Hashing password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in DB
    const createdUser = await User.create({
      email,
      password: hashedPassword,
      cash: 100000,
      holdingsValue: 0,
    });

    res.status(201).json({ createdUser });

    // Checking for errors
  } catch (error) {
    next(error);
  }
});

// Login route
router.get("/login", async (req, res, next) => {
  try {
    // Get body
    const { email, password } = req.body;

    // Check email
    const foundEmail = await User.findOne({ email });
    // Check password
    const isPasswordMatched = await bcrypt.compare(
      password,
      foundEmail.password
    );
    if (!foundEmail || !isPasswordMatched) {
      res.status(400).json({ message: `email or password incorrect` });
      return;
    }

    const playload = { email };

    // Create auth token
    const authToken = jsonwebtoken.sign(playload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "24h",
    });

    // Connect user
    res.status(200).json({ isLoggedIn: true, authToken });

    // Check for errors
  } catch (error) {
    next(error);
  }
});

// Verify route
router.get("/verify", async (req, res, next) => {
  // Get the bearer token from the header
  const { authorization } = req.headers;
  // extract the jwt
  const token = authorization.replace("Bearer ", "");

  try {
    // verify the web token
    const playload = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    // send the user the payload
    res.json({ token, playload });

    // if error, catch it and say token is invalid
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
});

module.exports = router;
