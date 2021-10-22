const { Instructor } = require("../models");
const { InstructorCat } = require("../models");
const { Category } = require("../models");

exports.getAllInstructorCat = async (req, res, next) => {
  try {
    const result = await InstructorCat.findAll({
      include: [{ model: Instructor }, { model: Category }],
    });

    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.addInstructorCat = async (req, res, next) => {
  try {
    const { instructorId, categoryId } = req.body;
    console.log(`req.body`, req.body);
    if (req.user.role === "admin") {
      const result = await InstructorCat.create({
        instructorId,
        categoryId,
      });
      res.json({ instructorId, categoryId });
    }
  } catch (error) {
    next(error.message);
  }
};

exports.deleteInstructorCat = async (req, res, next) => {
  try {
    const { instructorId, categoryId } = req.body;
    console.log(`req.body`, req.body);
    if (req.user.role === "admin") {
      const rows = await InstructorCat.destroy({
        where: {
          instructorId,
          categoryId,
        },
      });
      console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: "fail to delete waste" });
      }

      res.status(204).json({ message: "Delete Successfully" });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (err) {
    next(err);
  }
};
