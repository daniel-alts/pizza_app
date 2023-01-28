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

    const filepath = req.file.path;


    // upload to cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(filepath);


    // delete file
    fs.unlink(filepath, (err) => {
        if (err) return 
    })

    return res.status(200).json({
        message: 'File uploaded',
        status: true,
        url: cloudinaryResponse.url,
    })
}

fileUploadRouter.post(
    '/upload', 
    upload.single('avatar'),
    FileUploadController
)

module.exports = fileUploadRouter;