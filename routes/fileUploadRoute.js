const express = require('express')
const fileUploadRouter = express.Router();
const fs = require('fs')
require('dotenv').config()

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const fileUploadController = async (req, res) => {
    const filePath = req.file.path

    // upload to cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(filePath);

    // delete file
    fs.unlink(filePath, (err) => {
        if (err) return
    })

    res.status(200).json({
        message: 'File Uploaded',
        status: true,
        url: cloudinaryResponse.url
    })
}

fileUploadRouter.post('/upload', upload.single('avatar'), fileUploadController);

module.exports = fileUploadRouter;