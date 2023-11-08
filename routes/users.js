const express = require('express');
const router = express.Router();
const User = require('..//models/userModel');
// const Upload = require("../models/Upload");
const { body, validationResult } = require('express-validator');
// upload.js
// const multer  = require('multer')
//importing mongoose schema file
//setting options for multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


// app.get("/avatar", async (req, res) => {
//     try{
//         const avatars = await Upload.find({});
//         res.status(200).render(`avatars`, {avatars: avatars});
//     } catch (error) {
//         res.status(500).send({message: error.message});
//     }
// })

// picture adding
// router.post("/upload", upload.single("file"), async (req, res) => {
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


//get registration page
router.get('/reg', async(req, res) => {
  try{
      res.status(200).render(`reg`);
  } catch (error){
      res.status(500).json({message: error.message});
  }
})

//get authentification page and logout
router.get('/auth', async(req, res) => {
  try{
      currentuser = null;
      res.status(200).render(`auth`);
  } catch (error){
      res.status(500).json({message: error.message});
  }
})

//check auth user
router.post('/auth', async(req, res) => {
  try{
      const email = req.body.email;
      const users = await User.find({});
      console.log(email);

      users.forEach(user => {
        // for(let i=0);
        if(user.email === email){
          // curus = user;
          currentuser = user;
          // return user;
        }
      });

      try{
        const curid = currentuser.id;
        if(currentuser.password === req.body.password){
          // res.status(200).render(`users`, {currentuser: curus});
          res.status(200).redirect('/users/' + curid);// get one user
        }
        else{
          // res.status(500).json({message: "uncorrect password"});
          console.log("uncorrect password");
          res.status(500).redirect('/users/auth');
        }
      }catch (error){
        console.log("uncorrect email");
        res.status(200).redirect('/users/auth');
      }
      
      
  } catch (error){
      res.status(500).json({message: error.message});
  }
})


//get all users
router.get('/', async(req, res) => {
    try{
      const users = await User.find({});
      // res.status(200).json(users);
      console.log(users);
      try{
        res.status(200).render(`users`, {users: users, currentuser: currentuser});
      }catch (error){
        res.status(200).render(`users`, {users: users, currentuser: null});
      }

    } catch (error){
      res.status(500).json({message: error.message})
    }
  });

  // get one user
router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        // res.status(200).json(user);
        // console.log(user.id);
        // console.log(currentuser);
        if (currentuser != null){
          if (user.id === currentuser.id){
            res.status(200).render(`edituser`, {currentuser: user});
          }
          else{
            console.log("you are not registered")
            res.status(200).render(`user`, {user: user});
          }
        }
        else{
          console.log("you are not registered")
          res.status(200).render(`user`, {user: user});
        }

    } catch (error) {
        console.log({message: error.message})
        res.status(500).redirect('/users/auth');
        // res.status(500).json({message: error.message})
    }
  })
  
  //create new user registration
router.post('/', async(req, res) => {
    try{
      if(
        req.body.reppas === req.body.password && 
        req.body.email.indexOf('@') < req.body.email.lastIndexOf('.')-1 &&
        req.body.password.length > 5 ){
          
        const users = await User.find({});
        users.forEach(user => {
          if(req.body.email === user.email){
            res.status(200).redirect('/reg').send({message: "this email is already used"});
            // res.status(500).json({message: "this email is already used"});
          }  
        });
          
        const user = await User.create(req.body);
        currentuser = user;
        res.status(200).redirect('/users/' + user.id);// get one user
        
      } else{
        res.send("unallowable email or password");
        res.redirect('/reg');
      }
    } catch (error){
      console.log(error)
      res.status(500).json({message: error.message})
    }
  });
  
  //update user
router.post('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        let newuser = user;
        newuser.name = req.body.name 
        newuser.email = req.body.email

        // newuser.file = req.body.file
        console.log(req.body);
        if(req.body.password === ''){
          await User.findByIdAndUpdate(id, newuser);
          console.log("null password");
        }
        if (req.body.oldpas === user.password && req.body.password === req.body.reppas){
          console.log("change password");
          newuser.password = req.body.password
          await User.findByIdAndUpdate(id, newuser);
        } 
        
        if(!user){
            return res.status(404).json({message: `cannot find any user with ID ${id}`})
        }
        // if(!newuser){
        //   return res.status(404).json({message: `uncorrect passwords`})
        // }
        const updateduser = await User.findById(id);
        // res.status(200).json(updateduser);
        res.status(200).redirect('/users/' + id);
        console.log(updateduser);
  
    } catch (error) {
        res.status(500).json({message: error.message})
    }
  })
  
  //delete user
router.post('/del/:id', async(req, res) => {
  if (currentuser == null){
    res.redirect('/users/auth');
  }
  else{
    try{
      const {id} = req.params;
      const user = await User.findByIdAndDelete(id);
      
      if(!user){
          return res.status(404).json({message: `cannot find any user with ID ${id}`})
      }
      // res.status(200).json(user);
      // console.log(user);
      currentuser = null;
      res.status(200).redirect('/users/reg');

    } catch (error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
  }
  })

  // router.delete('/:id', async(req, res) => {
  //   try{
  //       const {id} = req.params;
  //       const user = await User.findByIdAndDelete(id);
        
  //       if(!author){
  //           return res.status(404).json({message: `cannot find any author with ID ${id}`})
  //       }
  //       res.status(200).json(user);
  //       console.log(user);
  //   } catch (error){
  //       console.log(error)
  //       res.status(500).json({message: error.message})
  //   }
  // })
  
module.exports = router;
