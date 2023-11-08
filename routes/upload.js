// upload.js
const express = require('express')
const multer  = require('multer')
//importing mongoose schema file
const Upload = require("../models/Upload");
const app = express()
//setting options for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// app.get("/avatar", async (req, res) => {
//     try{
//         const avatars = await Upload.find({});
//         res.status(200).render(`avatars`, {avatars: avatars});
//     } catch (error) {
//         res.status(500).send({message: error.message});
//     }
// })


// app.post("/upload", upload.single("file"), async (req, res) => {
//     // req.file can be used to access all file properties
//     try {
//       //check if the request has an image or not
//       if (!req.file) {
//         res.json({
//           success: false,
//           message: "You must provide at least 1 file"
//         });
//       } else {
//         let imageUploadObject = {
//           file: {
//             data: req.file.buffer,
//             contentType: req.file.mimetype
//           },
//           fileName: req.body.fileName
//         };
//         const uploadObject = new Upload(imageUploadObject);
//         // saving the object into the database
//         const uploadProcess = await uploadObject.save();
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Server Error");
//     }
//   });