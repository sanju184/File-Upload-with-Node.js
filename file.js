// Problem :

//  You are tasked with handling file uploads. The following code only accepts simple text data but you need to add functionality for file uploads.

// const express = require('express');
// const multer = require('multer');
// const app = express();

// // In-memory storage for files
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.post('/upload', upload.single('file'), (req, res) => {
// // File upload logic here
// res.send('File uploaded successfully');
// });

// app.listen(3000, () => console.log('Server running on port 3000'));

// Modify the code to allow only image files to be uploaded.
// Save the uploaded file to the server's filesystem.


// Solution :

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
   
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});


const upload = multer({ storage: storage });


app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send(`File uploaded successfully as ${req.file.filename}`);
});


app.listen(3000, () => console.log('Server running on port 3000'));