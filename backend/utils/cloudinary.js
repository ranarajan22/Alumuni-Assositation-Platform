const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const connectCloudinary = () => {
    cloudinary.config({
        cloud_name: '',
        api_key: '',
        api_secret: '',
    });
};

module.exports = connectCloudinary;
