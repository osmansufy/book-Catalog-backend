import express from 'express';
import { BookController } from '../book/book.controller';
import { EnumRole } from '@prisma/client';
import auth from '../../middlewares/authHandler';

const router = express.Router();

router.post(
  '/create-order',
  auth(EnumRole.CUSTOMER),
  BookController.createBook,
);

export const orderRoutes = router;
