import { Book, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import { IBookFilterRequest } from './book.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { PaginationHelper } from '../../../helpers/paginationHelper';
import {
  bookSearchableFields,
  bookFilterableFields,
  bookFilterMap,
} from './book.constants';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';

const createBook = async (book: Book) => {
  const newBook = await prisma.book.create({
    data: book,
  });

  return newBook;
};

const getAllBooks = async (
  filters: IBookFilterRequest,
  priceLimit: {
    maxPrice?: number;
    minPrice?: number;
  },
  options: IPaginationOptions,
): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, skip } = PaginationHelper.calculatePagination(options);

  const { search, ...restFilters } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(restFilters).length > 0) {
    andConditions.push({
      AND: Object.entries(restFilters).map(([key, value]) => {
        if (bookFilterableFields.includes(key)) {
          return {
            [bookFilterMap[key]]: {
              equals: value,
            },
          };
        }
        return {};
      }),
    });
  }

  const whereCondition: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const books = await prisma.book.findMany({
    where: {
      ...whereCondition,
      price: {
        lte: priceLimit.maxPrice || 1000000000,
        gte: priceLimit.minPrice || 0,
      },
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  return {
    meta: {
      page,
      limit,
      total: books.length,
    },
    data: books,
  };
};

const getBookById = async (id: string) => {
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  return book;
};
const getBooksByCategoryId = async (categoryId: string) => {
  const books = await prisma.book.findMany({
    where: {
      categoryId,
    },
  });
  if (!books) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  return books;
};

const updateBook = async (id: string, book: Book) => {
  const updatedBook = await prisma.book.update({
    where: {
      id,
    },
    data: book,
  });
  if (!updatedBook) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  return updatedBook;
};

const deleteBook = async (id: string) => {
  const deletedBook = await prisma.book.delete({
    where: {
      id,
    },
  });
  if (!deletedBook) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  return deletedBook;
};

export const BookService = {
  createBook,
  getAllBooks,
  getBookById,
  getBooksByCategoryId,
  updateBook,
  deleteBook,
};
