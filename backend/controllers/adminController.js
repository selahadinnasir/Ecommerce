import User from '../models/User.js';
import Order from '../models/Order.js';

// GET /api/admin/stats
// Private/Admin
export const getAdminStats = async (req, res) => {
  const usersCount = await User.countDocuments();

  const orders = await Order.find();
  const ordersCount = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0
  );

  res.json({
    usersCount,
    ordersCount,
    totalRevenue,
  });
};
