const multer = require('multer')
const uuidv4 = require('uuid').v4


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

module.exports = upload;