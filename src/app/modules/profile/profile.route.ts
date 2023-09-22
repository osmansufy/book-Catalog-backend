import { EnumRole } from '@prisma/client';
import express from 'express';
import { ProfileController } from './profile.controller';
import auth from '../../middlewares/authHandler';

const router = express.Router();

router.get(
  '/',
  auth(EnumRole.ADMIN, EnumRole.CUSTOMER),
  ProfileController.getUserProfile,
);

export const profileRoutes = router;
