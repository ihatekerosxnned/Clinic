const express = require('express');
const router = express.Router();
const {Staffs} = require('../models');
// // THIS IS FOR MA NIGGA MAG UPLOAD IMAGE NANI LODS WOW
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// UPLOAD STAFF LODS AH
router.post("/", upload.single('image'), async (req, res) => {
    try {
        const {firstName, lastName} = req.body;
        const image = req.file ? req.file.filename : '';

        const staffs = await Staffs.create({
            firstName: firstName,
            lastName: lastName,
            image: image,
        });
        res.json(staffs)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
