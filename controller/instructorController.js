const { Instructor } = require("../models");
const { InstructorCat } = require("../models");
const { Category } = require("../models");
const utils = require("util");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const express = require("express");

const app = express();

const uploadPromise = utils.promisify(cloudinary.uploader.upload);

exports.getAllInstructor = async (req, res, next) => {
  try {
    const insResult = await Instructor.findAll({
      include: { model: InstructorCat, include: { model: Category } },
    });

    res.json({ insResult });
  } catch (err) {
    next(err);
  }
};

exports.createInstructor = async (req, res, next) => {
  try {
    const {
      fullName,
      jobTitle,
      about,
      expertise,
      website,
      email,
      facebook,
      youtube,
      linkedin,
      twitter,
      profileImage,
      categoryId, // [1,2]
    } = req.body;
    console.log(`fullName`, fullName);
    if (req.user.role === "admin") {
      if (req.file) {
        const result = await uploadPromise(req.file.path);
        const insResult = await Instructor.create({
          // 10
          fullName,
          jobTitle,
          about,
          expertise,
          website,
          email,
          facebook,
          youtube,
          linkedin,
          twitter,
          profileImage: result.secure_url,
        });

        const input = categoryId.map(item => ({
          instructorId: insResult.id,
          categoryId: item,
        }));
        console.log(`input`, input);

        // const catmatch = await InstructorCat.bulkCreate([
        //   {},
        //   { instructorId: 10, categoryId: 2 },
        // ]);

        fs.unlinkSync(req.file.path);

        const catmatch = await InstructorCat.bulkCreate(input);

        res.json({ insResult, catmatch });
      } else {
        const insResult = await Instructor.create({
          fullName,
          jobTitle,
          about,
          expertise,
          website,
          email,
          facebook,
          youtube,
          linkedin,
          twitter,
        });

        const input = categoryId.map(item => ({
          instructorId: insResult.id,
          categoryId: item,
        }));
        console.log(`input`, input);

        const catmatch = await InstructorCat.bulkCreate(input);

        res.json({ insResult, catmatch });
      }
    }

    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error);
  }
};

exports.updateInstructor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      jobTitle,
      about,
      expertise,
      website,
      email,
      facebook,
      youtube,
      linkedin,
      twitter,
      profileImage,
      categoryId, // [1,2]
    } = req.body;
    if (req.user.role === "admin") {
      if (req.file) {
        const result = await uploadPromise(req.file.path);
        const [rows] = await Instructor.update({
          // 10
          fullName,
          jobTitle,
          about,
          expertise,
          website,
          email,
          facebook,
          youtube,
          linkedin,
          twitter,
          profileImage: result.secure_url,
        });

        const input = categoryId.map(item => ({
          instructorId: insResult.id,
          categoryId: item,
        }));
        console.log(`input`, input);

        fs.unlinkSync(req.file.path);

        const catmatch = await InstructorCat.bulkCreate(input);

        res.json({ insResult, catmatch });
      } else {
        const insResult = await Instructor.update({
          fullName,
          jobTitle,
          about,
          expertise,
          website,
          email,
          facebook,
          youtube,
          linkedin,
          twitter,
        });

        // const input = categoryId.map(item => ({
        //   instructorId: insResult.id,
        //   categoryId: item,
        // }));
        // console.log(`input`, input);

        // const catmatch = await InstructorCat.bulkCreate(input);
        // const catmatch = await InstructorCat.bulkCreate(input);

        res.json({
          insResult,
          // catmatch
        });
      }
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {}
};

exports.deleteInstructor = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role === "admin") {
      const rows = await Instructor.destroy({
        where: {
          id,
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
