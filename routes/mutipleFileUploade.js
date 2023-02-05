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

    console.log("files",files)

    for (const file of files) {
        const filePath = file.path;

    // upload to cloudinary
    const results = await  cloudinary.uploader.upload(filePath);
    console.log("results",results)
    urls.push(results.secure_url);

    // delete file
    fs.unlink(filePath, (err) => {
        if (err) console.log(err);
    })

}

    return res.status(200).json({
        message: 'File uploaded',
        status: true,
        url:  urls
    })
}

fileUploadRouter.post(
    '/upload', 
    upload.array('avatar', 5),
    FileUploadController
)

module.exports = fileUploadRouter;