import express from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.routes';
import { categoryRoutes } from '../modules/category/category.routes';
import { bookRoutes } from '../modules/book/book.route';

const router = express.Router();
console.log('router');
const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/books',
    route: bookRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
