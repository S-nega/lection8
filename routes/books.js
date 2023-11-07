const express = require('express');
const router = express.Router();
const Book = require('..//models/bookModel');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/add/', async(req, res) => {
    try{
        res.status(200).render(`addbook`);
    } catch (error){
        res.status(500).json({message: error.message});
    }
})

//get all books
router.get('/', async(req, res) => {
    try{
        const books = await Book.find({});
        // const viewBooks = JSON.stringify(books);
        console.log(books);
        res.status(200).render(`books`, {books: books});

    } catch (error){
        res.status(500).json({message: error.message});
    }
  });

  // get one book
router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        console.log(book);
        res.status(200).render(`book`, {book: book});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
  })
  
  //create new book
router.post('/', async(req, res) => {
    try{
        const book = await Book.create(req.body)
        // res.status(200).json(book);
        console.log(book);
        res.status(200).redirect('/books');

    } catch (error){
        console.log(error)
        res.status(500).json({message: error.message});
    }
  })
  
  //update book
router.post('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);
        
        if(!book){
            return res.status(404).json({message: `cannot find any Book with ID ${id}`})
        }
        const updatedBook = await Book.findById(id);
        // res.status(200).json(updatedBook);
        res.status(200).redirect('/books/' + id);
        console.log(updatedBook);
  
    } catch (error) {
        res.status(500).json({message: error.message});
    }
  })
  
  //delete book
router.post('/del/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        
        if(!book){
            return res.status(404).json({message: `cannot find any Book with ID ${id}`})
        }
        // res.status(200).json(book);
        console.log(book);
        res.status(200).redirect('/books');

    } catch (error){
        console.log(error)
        res.status(500).json({message: error.message});
    }
  })
  
module.exports = router;
