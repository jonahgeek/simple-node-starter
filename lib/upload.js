const multer = require('multer');
const sharp = require('sharp');
const slugify = require('slugify');

const upload = function upload(destinationPath, ext) {
  return multer({
    // fileFilter: (req, file, cb) => {
    //   const isValid = !!MIME_TYPE_MAP[file.mimetype];
    //   let error = isValid ? null : new Error('Invalid mime type!');
    //   cb(error, isValid);
    // },
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './public');
      },
      filename: (req, file, cb) => {
        const filename = `${slugify(file.originalname, {
          lower: true,
          strict: true
        })}-${Date.now()}.${ext}`;
        cb(null, destinationPath + '/' + filename);
      }
    })
  });
};

module.exports = upload;
