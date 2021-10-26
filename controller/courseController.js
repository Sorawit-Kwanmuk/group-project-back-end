const { Course } = require('../models');
const { CourseCat } = require('../models');
const { Category } = require('../models');
const { Promotion } = require('../models');
const utils = require('util');
const fs = require('fs');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const express = require('express');

const uploadPromise = utils.promisify(cloudinary.uploader.upload);

// exports.getAllCourse = async (req,res,next) => {
//     try {
//         const courseResult = await Course.findAll({

//         })
//     }
// }

exports.getAllCoursebyRating = async (req, res, next) => {
  try {
    const courseResult = await Course.findAll({
      include: [
        { model: CourseCat, include: { model: Category } },
        { model: Promotion },
      ],
      order: [["rating", "DESC"]],
    });
    res.json({ courseResult });
  } catch (error) {
    next(error);
  }
};

exports.getAllCourseByPro = async (req, res, next) => {
  try {
    const courseResult = await Course.findAll({
      include: [
        { model: CourseCat, include: { model: Category } },
        { model: Promotion },
      ],
      order: [["discountRate", "DESC"]],
    });
    console.log('courseResult: ', courseResult);
    res.json({ courseResult });
  } catch (error) {
    next(error);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const courseResult = await Course.findOne({ where: { id } });
    res.json({ courseResult });
  } catch (error) {
    next(err.message);
  }
};

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
      discountRate,
      discountUntil,
    } = req.body;
    console.log(req.body);
    if (req.user.role === 'admin') {
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
        discountRate,
        discountUntil,
      });
      console.log(`courseResult`, courseResult);
      let preparedInput = [];

      if (typeof categoryId === 'string') {
        preparedInput.push(+categoryId);
      } else {
        categoryId.forEach(item => {
          preparedInput.push(+item);
        });
      }
      const input = preparedInput.map(item => ({
        courseId: courseResult.id,
        categoryId: item,
      }));

      const catmatch = await CourseCat.bulkCreate(input);

      res.json({ courseResult, catmatch });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (error) {
    next(error.message);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      courseName,
      price,
      duration,
      shortDescription,
      about,
      level,
      clip,
      courseImage,
      discountRate,
      discountUntil,
    } = req.body;
    if (req.user.role === 'admin') {
      const result = await uploadPromise(req.file.path);
      const [rows] = await Course.update(
        {
          // 10
          courseName,
          price,
          duration,
          shortDescription,
          about,
          level,
          clip,
          courseImage: result.secure_url,
          discountRate,
          discountUntil,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.json([rows]);
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (err) {
    next(err.message);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.role === 'admin') {
      const rows = await Course.destroy({
        where: {
          id,
        },
      });
      console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: 'fail to delete Course' });
      }

      return res.status(204).json({ message: 'Delete Successfully' });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (error) {
    next(error.message);
  }
};
