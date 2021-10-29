const { User } = require("../models");

exports.getAllUser = async (req, res, next) => {
  try {
    const result = await User.findAll();
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.getUserByUserId = async (req, res, next) => {
  try {
    const result = await User.findOne({ where: { id: req.user.id } });
    return res.json({ result });
  } catch (err) {
    next(err);
  }
};
