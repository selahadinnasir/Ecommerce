import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { logActivity } from '../services/activityLogService.js';

// @desc    Get all users (admin)
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password') // hide password
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
//

// @desc    Get single user by ID (Admin)
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// Admin: update user role only
export const updateUserRole = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (typeof req.body.isAdmin !== 'boolean') {
    return res.status(400).json({ message: 'Invalid role value' });
  }

  user.isAdmin = req.body.isAdmin;
  await user.save();

  res.json({ message: 'User role updated' });
};

// Delete user
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  // Prevent admin from deleting self
  if (req.user._id.equals(req.params.id)) {
    return res.status(400).json({ message: 'Admin cannot delete self' });
  }

  await user.deleteOne();

  await logActivity({
    user: req.user,
    action: 'PROFILE_UPDATED',
    details: {},
    ip: req.ip,
  });

  res.json({ message: 'User removed' });
};

// GET /api/users/profile – get logged-in user
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// PUT /api/users/profile – update name/email
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  const updatedUser = await user.save();
  res.json(updatedUser);
};

// PUT /api/users/profile/password – change password
export const updatePassword = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (!req.body.currentPassword || !req.body.newPassword) {
    return res.status(400).json({ message: 'Missing passwords' });
  }

  const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
  if (!isMatch)
    return res.status(400).json({ message: 'Current password incorrect' });

  user.password = req.body.newPassword;
  await user.save();

  res.json({ message: 'Password updated successfully' });
};
