const ROUTER = require('express').Router()
const multer = require('multer')
const CONTROLLER = require('../controllers/imageUpload')
const upload = require('../middleware/upload') // multer middleware




ROUTER.route('/image').post(upload.single('image'), CONTROLLER.getImageName)


module.exports = ROUTER