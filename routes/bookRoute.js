const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const expressValidator=require('../utils/expressvalidator.util')

// Define routes
router.post('/addBook',expressValidator.addBook, bookController.addBook);
router.get('/getAllBooks', expressValidator.updateBook,bookController.getAllBooks);
router.get('/getBookById/:id', bookController.getBookById);
router.put('/updateBook/:id', bookController.updateBook);
router.delete('/deleteBook/:id', bookController.deleteBook);

module.exports = router;
