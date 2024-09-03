import { Router } from 'express';
import { handleForgotPassword, handleResetPassword } from '../controllers/authController';

const router = Router();

router.post('/forgot-password', handleForgotPassword);
router.post('/reset-password', handleResetPassword);

export default router;
