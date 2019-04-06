
exports.pdfFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(pdf)$/)) {
        return cb(new Error('Only PDF files are allowed!'), false);
    }
    cb(null, true);
};

