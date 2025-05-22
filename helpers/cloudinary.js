const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name : "dgu0acngm",
    api_key : "313946565468625",
    api_secret : "UlhFu87erXBKDHfh15mtVVI0EdM"
});

const storage = new multer.memoryStorage();

const ImageUploadUtils = async (file) => {
    const result = await cloudinary.uploader.upload(file, {
        resource_type : 'auto'
    });
    return result;
}

const upload = multer({storage});

module.exports = {upload, ImageUploadUtils}