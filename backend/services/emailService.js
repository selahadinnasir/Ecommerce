// services/emailService.js
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create transporter
const resend = new Resend(process.env.RESEND_API_KEY);

// Nodemailer (fallback / SMTP)
let transporter;
if (process.env.EMAIL_PROVIDER === 'smtp') {
  transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

export const sendEmail = async ({ to, subject, text, html }) => {
  if (process.env.EMAIL_PROVIDER === 'resend') {
    await resend.emails.send({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html: html || `<p>${text}</p>`,
    });
  } else {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
      html,
    });
  }
};

// ----- Sample Emails -----

export const sendOrderConfirmationEmail = async (user, order) => {
  transporter.verify((error, success) => {
    if (error) console.log('Mail Error:', error);
    else console.log('Mail Server is Ready!');
  });

  await sendEmail({
    to: user.email,
    subject: `Order Confirmation - ${order._id}`,
    text: `Hi ${user.name}, your order has been received!`,
    html: `<p>Hi <strong>${user.name}</strong>,</p>
           <p>Your order <strong>${order._id}</strong> has been received and is being processed.</p>`,
  });
};

export const sendShippingEmail = async (user, order) => {
  await sendEmail({
    to: user.email,
    subject: `Order Shipped - ${order._id}`,
    text: `Hi ${user.name}, your order has been shipped!`,
    html: `<p>Hi <strong>${user.name}</strong>,</p>
           <p>Your order <strong>${order._id}</strong> has been shipped!</p>`,
  });
};

export const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  await sendEmail({
    to: user.email,
    subject: 'Password Reset Request',
    text: `Hi ${user.name}, reset your password: ${resetUrl}`,
    html: `<p>Hi <strong>${user.name}</strong>,</p>
           <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });
};
