const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Book = require('./models/bookModel')
const Author = require('./models/authorModel')
// upload.js
// const multer  = require('multer')
//importing mongoose schema file
// const Upload = require("../models/Upload");
//setting options for multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

let currentuser = null;

// const indexRouter = require('./routes/index');
const UsersRouter = require('./routes/users', {currentuser: currentuser});
const BooksRouter = require('./routes/books', {currentuser: currentuser});
const AuthorRouter = require('./routes/authors');

const app = express();

// app.use(express.json())
// app.use(express.urlencoded({extended: false}))

//express session middleware
// app.use(session({
//     secret: 'yoursecret',
//     resave: false,
//     saveUnitialized: true,
//     cookie: {secure: true} 
// }));
// routes

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.set('view engine', 'ejs');

app.use(logger('dev'));
//middleware for json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"))
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


//lect 8.1.1
app.get('/hello', (req, res) => {
  res.send('Hello Express!');
});

//lect 8.1.2
app.get('/text/:text', async(req, res) => {
  const {text} = req.params; 
  res.send(text);
});

// app.post("/upload", upload.single("file"), async (req, res) => {
//   // req.file can be used to access all file properties
//   try {
//     //check if the request has an image or not
//     if (!req.file) {
//       res.json({
//         success: false,
//         message: "You must provide at least 1 file"
//       });
//     } else {
//       let imageUploadObject = {
//         file: {
//           data: req.file.buffer,
//           contentType: req.file.mimetype
//         },
//         fileName: req.body.fileName
//       };
//       const uploadObject = new Upload(imageUploadObject);
//       // saving the object into the database
//       const uploadProcess = await uploadObject.save();
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });

app.use('/books', BooksRouter);
app.use('/authors', AuthorRouter);
app.use('/users', UsersRouter);

app.set({currentuser: currentuser});

//get one book



mongoose.
connect('mongodb+srv://admin:admin@booksdb.9ym73nv.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
// app.listen(3000, ()=> {
//     console.log(`Node API app is running on port 3000`)
// });    
console.log('connected to MongoDB')
  }).catch((error) => {
    console.log(error)
})

module.exports = app;

