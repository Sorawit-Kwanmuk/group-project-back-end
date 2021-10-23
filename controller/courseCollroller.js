const { Course } = require("../models");
const { CourseCat } = require("../models");
const { Category } = require("../models");
const utils = require("util");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const express = require("express");

const uploadPromise = utils.promisify(cloudinary.uploader.upload);

// exports.getAllCourse = async (req,res,next) => {
//     try {
//         const courseResult = await Course.findAll({

//         })
//     }
// }

exports.createCourse = async (req, res, next) => {
  try {
    const {
      courseName,
      price,
      duration,
      shortDescription,
      about,
      level,
      clip,
      courseImage,
      categoryId,
    } = req.body;

    if (req.user.role === "admin") {
      const result = await uploadPromise(req.file.path);
      const courseResult = await Course.create({
        courseName,
        price,
        duration,
        shortDescription,
        about,
        level,
        clip,
        courseImage: result.secure_url,
      });

      const input = categoryId.map(item => ({
        courseId: courseResult.id,
        categoryId: item,
      }));

      const catmatch = await CourseCat.bulkCreate(input);

      res.json({ courseResult, catmatch });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error.message);
  }
};
