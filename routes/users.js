const express = require('express');
const router = express.Router();
const User = require('..//models/userModel');
const { body, validationResult } = require('express-validator');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//get all users
router.get('/', async(req, res) => {
    try{
        const users = await User.find({});
        // res.status(200).json(users);
        console.log(users);
        res.status(200).render(`users`, {users: users});

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
        console.log(user);
        res.status(200).render(`user`, {user: user});

    } catch (error) {
        res.status(500).json({message: error.message})
    }
  })
  
  //create new user
router.post('/', async(req, res) => {
    try{
      if(req.body.password.size >= 6 && 
        req.body.email.indexOf('@') < req.body.email.lastIndexOf('.')-1){
        const user = await User.create(req.body);
        res.status(200).json(user);
        console.log(user);
        
      } else{
        console.log(JSON.stringify(req.body.password).size);
        res.send("uncorrect email or password");
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
router.delete('/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        
        if(!user){
            return res.status(404).json({message: `cannot find any user with ID ${id}`})
        }
        res.status(200).json(user);
        console.log(user);
    } catch (error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
  })
  
module.exports = router;
