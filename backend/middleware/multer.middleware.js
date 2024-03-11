
const multer = require('multer');


console.log("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        console.log(file);
        return cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      return cb(null, Date.now() + '-' + file.originalname)
    },
  });
  
  const upload = multer({ storage: storage , limits: { fileSize: 5 * 1024 * 1024 }});

  module.exports = upload;