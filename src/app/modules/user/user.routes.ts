import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/authHandler';
import { EnumRole } from '@prisma/client';

const router = express.Router();

router.get('/', auth(EnumRole.ADMIN), UserController.getAllUsers);
router.get('/:id', auth(EnumRole.ADMIN), UserController.getUserById);
router.patch('/:id', auth(EnumRole.ADMIN), UserController.updateUserById);
router.delete('/:id', auth(EnumRole.ADMIN), UserController.deleteUserById);

export const userRoutes = router;
