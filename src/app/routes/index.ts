import express from 'express';
import { userRoutes } from '../modules/auth/auth.routes';

const router = express.Router();
console.log('router');
const moduleRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
