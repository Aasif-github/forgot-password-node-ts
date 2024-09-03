import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendPasswordResetEmail } from '../utils/email';
import { getUserByEmail, updateUserPassword, saveResetToken } from '../models/userModel';

export const forgotPassword = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) throw new Error('User not found');

  const resetToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  await saveResetToken(email, resetToken);

  const resetURL = `http://your-frontend-url.com/reset-password?token=${resetToken}`;
  await sendPasswordResetEmail(email, resetURL);
};

export const resetPassword = async (token: string, newPassword: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
  const user = await getUserByEmail(decoded.email);
  if (!user || user.resetToken !== token) throw new Error('Invalid or expired token');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(user.email, hashedPassword);
};
