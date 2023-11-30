const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { forkJoin, of } = require('rxjs');
const { catchError, map } = require('rxjs/operators');

const app = express();

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/authors.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

let currentuser = null;

const UsersRouter = require('./routes/users', {currentuser: currentuser});
const BooksRouter = require('./routes/books', {currentuser: currentuser});
const AuthorRouter = require('./routes/authors');


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
app.use('/api/books', BooksRouter);
app.use('/api/authors', AuthorRouter);
app.use('/api/users', UsersRouter);


// Симулируем два асинхронных запроса
const fetchData1 = () => of('Результат запроса 1');
const fetchData2 = () => of('Результат запроса 2');

// Объединяем результаты запросов с использованием forkJoin
forkJoin({
  data1: fetchData1(),
  data2: fetchData2()
})
.pipe(
  map(results => {
    // Обрабатываем результаты
    console.log('Результат запроса 1:', results.data1);
    console.log('Результат запроса 2:', results.data2);
  }),
  catchError(error => {
    console.error('Произошла ошибка:', error);
    // Обработка ошибки объединения результатов запросов
    return of('Заменяющие данные');
  })
)
.subscribe();

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

