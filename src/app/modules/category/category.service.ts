import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const createCategory = async (category: Category) => {
  const newCategory = await prisma.category.create({
    data: category,
  });
  return newCategory;
};

const getAllCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

const getCategoryById = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  return category;
};

const updateCategoryById = async (id: string, category: Partial<Category>) => {
  const updatedCategory = await prisma.category.update({
    where: {
      id: id,
    },
    data: category,
  });
  if (!updatedCategory)
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  return updatedCategory;
};

const deleteCategoryById = async (id: string) => {
  const deletedCategory = await prisma.category.delete({
    where: {
      id: id,
    },
  });
  if (!deletedCategory)
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  return deletedCategory;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
