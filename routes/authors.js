const express = require('express');
const router = express.Router();
const Author = require('..//models/authorModel');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//get all authors
router.get('/', async(req, res) => {
    try{
        const authors = await Author.find({});
        res.status(200).json(authors);
        console.log(authors);
    } catch (error){
        res.status(500).json({message: error.message})
    }
  });

  // get one author
router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const author = await Author.findById(id);
        res.status(200).json(author);
        console.log(author);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
  })
  
  //create new author
router.post('/', async(req, res) => {
    try{
        const author = await Author.create(req.body)
        res.status(200).json(author);
        console.log(author);
    } catch (error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
  })
  
  //update author
router.put('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const author = await Author.findByIdAndUpdate(id, req.body);
        
        if(!author){
            return res.status(404).json({message: `cannot find any author with ID ${id}`})
        }
        const updatedauthor = await Author.findById(id);
        res.status(200).json(updatedauthor);
        console.log(updatedauthor);
  
    } catch (error) {
        res.status(500).json({message: error.message})
    }
  })
  
  //delete author
router.delete('/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const author = await Author.findByIdAndDelete(id);
        
        if(!author){
            return res.status(404).json({message: `cannot find any author with ID ${id}`})
        }
        res.status(200).json(author);
        console.log(author);
    } catch (error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
  })
  
module.exports = router;
