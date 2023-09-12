import express from 'express';
import { UserController } from './auth.controller';

const router = express.Router();

router.post('/signup', UserController.createUser);

export const userRoutes = router;
