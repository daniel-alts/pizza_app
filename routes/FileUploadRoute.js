const fs = require('fs')
const express = require('express')
const multer  = require('multer')
const cloudinary = require('cloudinary').v2

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const upload = multer({ dest: 'uploads/' })

const fileUploadRouter = express.Router();

const FileUploadController = async (req, res) => {
  const urls = [];
  const files = req.files;
  for (const file of files) {
    const filepath = file.path;
    // upload to cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(filepath);
    urls.push(cloudinaryResponse.url);

    // delete file
    fs.unlink(filepath, (err) => {
        if (err) console.log(err);
    })
  }

    return res.status(200).json({
        message: 'Files uploaded',
        status: true,
        urls: urls,
    })
}

fileUploadRouter.post(
    '/upload', 
    upload.array('avatars', 2),
    FileUploadController
)

module.exports = fileUploadRouter;