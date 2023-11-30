const express = require('express');
const router = express.Router();
const Book = require('..//models/bookModel');

const { from, of } = require('rxjs');
const { catchError, map } = require('rxjs/operators');

// Симулируем асинхронный запрос, который может завершиться с ошибкой
const fetchData = () => {
  return new Promise((resolve, reject) => {
    // reject('Ошибка при получении данных');    
    resolve('Данные успешно получены');
  });
};

// Создаем наблюдаемую последовательность из асинхронного запроса
const observable = from(fetchData());

// Обрабатываем ошибку с использованием catchError
observable.pipe(
  catchError(error => {
    console.error('Произошла ошибка:', error);
    return of('Заменяющие данные');
  })
)
.subscribe(data => {
  console.log('Полученные данные:', data);
});


//get page of adding new book
router.get('/add', async(req, res) => {
    try{
        if (currentuser){
            res.status(200).render(`addbook`);
        }
        else{
            res.status(200).redirect('/api/users/auth');
        }
    } catch (error){
        res.status(500).redirect('/api/users/auth');
        res.status(500).render('error', {message: error.message});
    }
})

//get page of finding
router.get('/find', async(req, res) => {
    try{
        if (currentuser != null){        
            const books = await Book.find({});
            let name = req.body.name;
            let author = req.body.author;
            let year = req.body.year;
            if(req.body.books){
                books = req.body.books;
            }
            res.status(200).render(`findbook`, {name: name, author: author, year: year, findedBooks: books});
        }
        else{
            res.status(200).redirect('/api/users/auth');
        }    
    } catch (error){
        res.status(200).redirect('/api/users/auth');
    }
})

//get all books
router.get('/', async(req, res) => {
    try{
        const books = await Book.find({});
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
        try{
            if (currentuser != null){
                res.status(200).render(`editbook`, {book: book, currentuser: currentuser});
            }
            else{
                console.log("you are not registered")
                res.status(200).render(`book`, {book: book});
            }        
        }catch (error){
            console.log("you are not registered")
            res.status(200).render(`book`, {book: book});
        }        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
  })

  //get one concrete book find
  router.post('/find', async(req, res) => {
    try{
        const books = await Book.find({});
        const findedBooks = [];
        let name = req.body.name;
        let author = req.body.author;
        let year = req.body.year;
        
        books.forEach(book => {
            if(!book.name.toLowerCase().indexOf(name.toLowerCase()) &&
               !book.author.toLowerCase().indexOf(author.toLowerCase())){
                findedBooks.push(book);     
            }
        });
        console.log(findedBooks);
        res.status(200).render('findbook', {findedBooks: findedBooks, name: name, author: author, year: year});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
  });
  
  //create new book
router.post('/', async(req, res) => {
    try{
        if(req.body.year < 2024 && 
           req.body.name.length >= 3 && 
           req.body.author.length >= 3){
        const book = await Book.create(req.body)
        console.log(book);
        res.status(200).redirect('/api/books');
        }
        else{
            console.log("unallowable data");
            res.redirect('/api/books/add');
        }
    } catch (error){
        console.log(error)
        res.status(500).json({message: error.message});
    }
  })
  
  //update book
router.post('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        let book = await Book.findById(id);

        if(req.body.year < 2024 && 
            req.body.name.length >= 3 && 
            req.body.author.length >= 3){
            book = await Book.findByIdAndUpdate(id, req.body);
        }
        
        if(!book){
            return res.status(404).json({message: `cannot find any Book with ID ${id}`})
        }
        const updatedBook = await Book.findById(id);
        res.status(200).redirect('/api/books/' + id);
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
        res.status(200).redirect('/api/books');

    } catch (error){
        res.status(500).json({message: error.message});
    }
  })
  
module.exports = router;
