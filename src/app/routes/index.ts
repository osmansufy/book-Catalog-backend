import express from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.routes';
import { categoryRoutes } from '../modules/category/category.routes';
import { bookRoutes } from '../modules/book/book.route';
import { orderRoutes } from '../modules/order/order.route';
import { profileRoutes } from '../modules/profile/profile.route';

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
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/books',
    route: bookRoutes,
  },
  {
    path: '/profile',
    route: profileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
