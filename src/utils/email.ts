import nodemailer from 'nodemailer';

export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  console.log('email', transporter);

  await transporter.sendMail({
    from: `"Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset',
    html: `<p>You requested a password reset</p><p>Click this <a href="${resetURL}">link</a> to reset your password</p>`,
  });
};
