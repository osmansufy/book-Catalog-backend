import express from 'express';
import { CategoryController } from './category.controller';
import { EnumRole } from '@prisma/client';
import auth from '../../middlewares/authHandler';

const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post(
  '/create-category',
  auth(EnumRole.ADMIN),
  CategoryController.createCategory,
);
router.put('/:id', auth(EnumRole.ADMIN), CategoryController.updateCategoryById);
router.delete(
  '/:id',
  auth(EnumRole.ADMIN),
  CategoryController.deleteCategoryById,
);

export const categoryRoutes = router;
