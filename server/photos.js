const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../public/images/',
  limits: {
    fileSize: 10000000
  }
});

const users = require("./users.js");
const User = users.model;

const photoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  chefPath: String,
  myPath: String,
  title: String,
  description: String,
  comments:[],
  created: {
    type: Date,
    default: Date.now
  },
});

const Photo = mongoose.model('Photo', photoSchema);

// upload photo
// router.post("/", auth.verifyToken, User.verify, upload.single('photo'), async (req, res) => {
//   // check parameters
//   if (!req.file)
//     return res.status(400).send({
//       message: "Must upload a file."
//     });
//
//   const photo = new Photo({
//     user: req.user,
//     path: "/images/" + req.file.filename,
//     title: req.body.title,
//     description: req.body.description,
//   });
//   try {
//     await photo.save();
//     return res.sendStatus(200);
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(500);
//   }
// });
// upload photo
router.post("/", auth.verifyToken, User.verify, upload.any(), async (req, res) => {
  // check parameters
  // console.log(req.files);
  // console.log(req.files[0]);
  // console.log(req.files['chefPhoto']);
  if (!req.files)
    return res.status(400).send({
      message: "Must upload files."
    });

  const photo = new Photo({
    user: req.user,
    chefPath: "/images/" + req.files[0].filename,
    myPath: "/images/" + req.files[1].filename,
    title: req.body.title,
    description: req.body.description,
  });

  try {
    await photo.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my photos
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  // return photos
  try {
    let photos = await Photo.find({
      user: req.user
    }).sort({
      created: -1
    });
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all photos
router.get("/all", async (req, res) => {
  try {
    let photos = await Photo.find().sort({
      created: -1
    }).populate('user');
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


// get a single photo
router.get("/:id", async (req, res) => {
  // return photo
  try {
    let photo = await Photo.findOne({
        _id: req.params.id
    });
    return res.send(photo);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


// if (!(this.comments))
//   Vue.set(app.comments, this.number, new Array);//if creating a new property, must use Vue.set !!
// this.comments.push({
//   author: req.body.addedName,
//   text: req.body.addedComment,
// //  time: moment().format('MMMM Do YYYY'),
// });

router.put("/:id", async (req, res) => {
  try {

    let photo = await Photo.findOne({
        _id: req.params.id
    }).populate('user');

    photo.comments.push({
      name: req.body.addedName,
      comment: req.body.addedComment,
      // time: moment().format('MMMM Do YYYY'),
    });

    photo.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Photo,
  routes: router,
}
