const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const expressValidator=require('../utils/expressvalidator.util')
const currentUser=require('../middlewares/userAuthentication.middleware')
// Define routes
router.post('/addBook',currentUser.currentUser,expressValidator.addBook, bookController.addBook);
router.get('/getAllBooks',currentUser.currentUser, expressValidator.updateBook,bookController.getAllBooks);
router.get('/getBookById/:id',currentUser.currentUser, bookController.getBookById);
router.put('/updateBook/:id',currentUser.currentUser, bookController.updateBook);
router.delete('/deleteBook/:id',currentUser.currentUser, bookController.deleteBook);

module.exports = router;
