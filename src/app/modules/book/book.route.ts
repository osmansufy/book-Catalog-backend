import express from 'express';
import { BookController } from './book.controller';
import auth from '../../middlewares/authHandler';
import { EnumRole } from '@prisma/client';

const router = express.Router();

router.get('/', BookController.getAllBooks);

router.get('/:bookId', BookController.getBookById);

router.post('/create-book', auth(EnumRole.ADMIN), BookController.createBook);

router.patch('/:bookId', auth(EnumRole.ADMIN), BookController.updateBookById);

router.delete('/:bookId', auth(EnumRole.ADMIN), BookController.deleteBookById);

router.get('/category/:categoryId', BookController.getBooksByCategoryId);

export const bookRoutes = router;
