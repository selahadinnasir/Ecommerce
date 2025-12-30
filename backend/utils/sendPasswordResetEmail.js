import { sendEmail } from '../services/emailService.js';

// password reset (forgot password)
export const sendPasswordResetEmail = async (user, resetUrl) => {
  const html = `
    <h2>Password Reset Request</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
  `;

  await sendEmail({
    to: user.email,
    subject: 'Password Reset Request',
    html,
  });
};
