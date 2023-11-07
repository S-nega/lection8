const express = require('express');
const router = express.Router();
const User = require('..//models/userModel');
const { body, validationResult } = require('express-validator');

let currentuser = null;

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

      const curid = currentuser.id;
      if(currentuser.password === req.body.password){
        // res.status(200).render(`users`, {currentuser: curus});
        res.status(200).redirect('/users/' + curid);// get one user
      }
      else{
        res.status(500).json({message: "uncorrect password or email"});
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
        res.status(200).render(`users`, {users: users, currentuser: currentuser});

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
        console.log(currentuser);
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
        res.status(500).json({message: error.message})
    }
  })
  
  //create new user registration
router.post('/', async(req, res) => {
    try{
      if(
        req.body.reppas === req.body.password && 
        req.body.email.indexOf('@') < req.body.email.lastIndexOf('.')-1){
          
        const users = await User.find({});
        users.forEach(user => {
          if(req.body.email === user.email){
            res.status(500).json({message: "this email is already used"});
          }  
        });
          
        const user = await User.create(req.body);
        currentuser = user;
        res.status(200).redirect('/users/' + user.id);// get one user
        
      } else{
        res.send("unallowable email or password");
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
        const user = await User.findByIdAndUpdate(id, req.body);
        
        if(!user){
            return res.status(404).json({message: `cannot find any user with ID ${id}`})
        }
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
  })
  
module.exports = router;
