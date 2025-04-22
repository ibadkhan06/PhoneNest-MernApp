const path = require("path");
const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");          //tells where the files by stored when user adds file
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);   //tells what would be the file name
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } 
    console.log('File:', req.file);
    console.log('Body:', req.body);
    
     if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path.replace(/\\/g, '/')}`,

      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

module.exports = router;

// File: Refers to the actual data stored on a disk.
// MIME Type: Refers to the type of content of the file.
