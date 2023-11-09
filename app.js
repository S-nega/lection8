const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

let currentuser = null;

const UsersRouter = require('./routes/users', {currentuser: currentuser});
const BooksRouter = require('./routes/books', {currentuser: currentuser});
const AuthorRouter = require('./routes/authors');

const app = express();

const http = require("http");
const fs = require("fs");
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static("public"))


//lect 8.1.1
app.get('/hello', (req, res) => {
  res.send('Hello Express!');
});

//lect 8.1.2
app.get('/text/:text', async(req, res) => {
  const {text} = req.params; 
  res.send(text);
});


app.set({currentuser: currentuser});
app.use('/books', BooksRouter);
app.use('/authors', AuthorRouter);
app.use('/users', UsersRouter);



mongoose.
connect('mongodb+srv://admin:admin@booksdb.9ym73nv.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
console.log('connected to MongoDB')
  }).catch((error) => {
    console.log(error)
})


const multer = require("multer");

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!" + err.message);
};

const upload = multer({
  dest: "/public/images/"
});

app.get("/image.png", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/images/image.png"));
});

app.post(
  "/upload/:id",
  upload.single("file" /* name attribute of <file> element in your form */),
  async(req, res) => {
    const tempPath = req.file.path;
    const {id} = req.params; 
    const targetPath = path.join(__dirname, "./public/images/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .redirect("/users/" + id)
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);


module.exports = app;

