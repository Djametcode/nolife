import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '/tmp')
    },
    filename(req, file, callback) {
        callback(null, file.originalname + '_' + Date.now())
    },
})

export const upload = multer({ storage: storage }).single('file')