// controllers/orderController.js
import Order from '../models/Order.js';
import { sendOrderConfirmationEmail } from '../services/emailService.js';
import Product from '../models/Product.js';
import { logActivity } from '../services/activityLogService.js';
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    // Reduce stock for each ordered product
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (!product) continue;

      if (product.countInStock < item.qty) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${product.name}` });
      }

      product.countInStock -= item.qty;
      await product.save();

      if (product.countInStock < 5) {
        console.log(
          `Stock alert: ${product.name} is running low (${product.countInStock})`
        );
        // Optionally send email to admin using emailService
      }
    }
    // log acitivity when order is created
    await logActivity({
      user: req.user,
      action: 'ORDER_CREATED',
      details: { orderId: order._id, total: order.totalPrice },
      ip: req.ip,
    });

    // send email AFTER order is created, the below code may fail on some wifi, so uncomment if you
    // want to test the email sending feature
    // await sendOrderConfirmationEmail(req.user, createdOrder);
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark order as paid (after Stripe payment success)
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.isPaid = true;
    order.paidAt = Date.now();
    order.status = 'paid'; // Update status

    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const { status } = req.body;

    const validStatuses = [
      'pending',
      'paid',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    order.status = status;
    order.isDelivered = status === 'delivered';
    if (status === 'delivered') order.deliveredAt = Date.now();
    else order.deliveredAt = null;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email') // Show which user placed the order
      .sort({ createdAt: -1 }); // newest first

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//  to delete all orders (I do these just for testing)
export const deleteAllOrders = async (req, res) => {
  try {
    await Order.deleteMany({});
    res.json({ message: 'All orders have been deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/orders/:id/deliver
// Admin can mark order delivered
export const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.isDelivered = true;
  order.deliveredAt = Date.now();
  order.status = 'delivered';

  await order.save();

  res.json({ message: 'Order marked as delivered', order });
};
