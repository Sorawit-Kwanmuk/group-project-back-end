const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const CustomError = require("../utils/error");

exports.authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(401).json({ message: "you are unauthorized" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "you are unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decoded);

    const user = await User.findOne({ where: { id: decoded.id } });
    // console.log(user);
    if (!user) {
      return res.status(401).json({ message: "you are unauthorized" });
    }

    req.user = user;
    req.data = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const {
      fullName,
      birthDate,
      email,
      mobileNo,
      username,
      password,
      confirmPassword,
    } = req.body;

    if (password !== confirmPassword) {
      throw new CustomError("password and confirm password did not match", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      fullName,
      birthDate,
      email,
      mobileNo,
      username,
      password: hashedPassword,
    });
    res.status(200).json({ message: "your account has been created" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(`username`, username);
    console.log(`password`, password);
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(400).json({ message: "invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid username or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 3600,
    }); // '30d'
    res.json({ message: "success logged in", token });
  } catch (err) {
    next(err.message);
  }
};
