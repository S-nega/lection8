/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: Name of the author
 *         surname:
 *           type: string
 *           description: Surname of the author
 *         createdAt: 
 *           type: string 
 *           description: Time when author was added
 *         updatedAt: 
 *           type: string 
 *           description: Time when author was updated
 *       example:
 *         id: d5fE_asz
 *         name: Alexander
 *         surname: Dewdney
 *         createdAt: 2023-11-09T07:24:08.759Z
 *         updatedAt: 2023-11-09T07:24:08.759Z
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - year
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book's author
 *         year:
 *           type: number
 *           description: The year when book was writed
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         year: 2008
 */

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: The authors
 * /authors:
 *   get:
 *      summary: Lists all the authors
 *      tags: [Authors]
 *      responses:
 *        200:
 *          description: The list of the authors
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Author'
 *   post:
 *     summary: Add new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Added authors.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       500:
 *         description: Some server error
 * 
 * /authors/{id}:
 *   get:
 *     summary: Get the author by id
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author id
 *     responses:
 *       200:
 *         description: The author response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: The author was not found
 *   put:
 *    summary: Update the author by the id
 *    tags: [Authors]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The author id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Author'
 *    responses:
 *      200:
 *        description: The author was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Author'
 *      404:
 *        description: The author was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the author by id
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author id
 *
 *     responses:
 *       200:
 *         description: The author was deleted
 *       404:
 *         description: The author was not found
 *
 */
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   get:
 *     summary: Lists all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 * /books/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *   post:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 * 
 * /books/del/{id}:
 *   post:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */
const express = require('express');
const router = express.Router();
const Author = require('..//models/authorModel');


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
