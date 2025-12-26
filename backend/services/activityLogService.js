import ActivityLog from '../models/ActivityLog.js';

export const logActivity = async ({ user, action, details, ip }) => {
  try {
    await ActivityLog.create({
      user: user?._id,
      action,
      details,
      ip,
    });
  } catch (error) {
    console.log('Activity Log Error:', error.message);
  }
};
