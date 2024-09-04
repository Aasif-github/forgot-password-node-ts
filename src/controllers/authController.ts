import { Request, Response } from 'express';
import { forgotPassword, resetPassword } from '../services/authService';

export const handleForgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(email);
  try {
    await forgotPassword(email);
    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const handleResetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  try {
    await resetPassword(token, newPassword);
    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
