import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { BookService } from './book.service';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { bookFilterableFields } from './book.constants';

const createBook = catchAsync(async (req, res) => {
  const newBook = await BookService.createBook(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book created successfully',
    data: newBook,
  });
});

const getAllBooks = catchAsync(async (req, res) => {
  const priceLimit = pick(req.query, ['minPrice', 'maxPrice']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, bookFilterableFields);

  const result = await BookService.getAllBooks(filters, priceLimit, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    data: result,
  });
});

const getBookById = catchAsync(async (req, res) => {
  const book = await BookService.getBookById(req.params.bookId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    data: book,
  });
});

const getBooksByCategoryId = catchAsync(async (req, res) => {
  const books = await BookService.getBooksByCategoryId(req.params.categoryId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    data: books,
  });
});

const updateBookById = catchAsync(async (req, res) => {
  const book = await BookService.updateBook(req.params.bookId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: book,
  });
});

const deleteBookById = catchAsync(async (req, res) => {
  await BookService.deleteBook(req.params.bookId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
  getBooksByCategoryId,
};
