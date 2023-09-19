import multer from "multer";

const diskStorage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, '/tmp')
    },
    filename(req, file, callback) {
        callback(null, file.originalname + '-' + Date.now())
    },
})

export const upload = multer({storage: diskStorage}).single('file')