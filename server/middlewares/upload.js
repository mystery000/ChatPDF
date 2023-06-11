const fs = require('fs');
const multer = require('multer');

const uploader = {
    storage: function () {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                const dir = `public/files`;
                if (!fs.existsSync(dir)) fs.mkdirSync(dir);
                cb(null, dir);
            },
            filename: function (req, file, cb) {
                cb(null, req.user._id + '_' + Date.now() + '_' + file.originalname);
            },
        });
        return storage;
    },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(pdf|txt)$/)) {
            return cb(
                new Error('Only PDF or Text file type are allowed!', false),
            );
        }
        cb(null, true);
    },
};

const upload = multer({
    storage: uploader.storage(),
    fileFilter: uploader.fileFilter,
});

module.exports = upload.single('file');
