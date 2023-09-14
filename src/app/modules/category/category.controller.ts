import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const newCategory = await CategoryService.createCategory(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Category created successfully',
    data: newCategory,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const categories = await CategoryService.getAllCategories();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Categories fetched successfully',
    data: categories,
  });
});

const getCategoryById = catchAsync(async (req, res) => {
  const category = await CategoryService.getCategoryById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category fetched successfully',
    data: category,
  });
});

const updateCategoryById = catchAsync(async (req, res) => {
  const updatedCategory = await CategoryService.updateCategoryById(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category updated successfully',
    data: updatedCategory,
  });
});

const deleteCategoryById = catchAsync(async (req, res) => {
  const deletedCategory = await CategoryService.deleteCategoryById(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category deleted successfully',
    data: deletedCategory,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
