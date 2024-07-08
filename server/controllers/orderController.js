import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      email,
      phone,
      billingAddress,
      billingCity,
      billingZip,
      shippingAddress,
      shippingCity,
      shippingZip,
      sameAsBilling,
      totalAmount,
      status,
      isGuest,
    } = req.body;

    const newOrder = await Order.create({
      userId,
      firstName,
      lastName,
      email,
      phone,
      billingAddress,
      billingCity,
      billingZip,
      shippingAddress: sameAsBilling ? billingAddress : shippingAddress,
      shippingCity: sameAsBilling ? billingCity : shippingCity,
      shippingZip: sameAsBilling ? billingZip : shippingZip,
      totalAmount,
      status,
      isGuest,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    const orders = await Order.findAll({ where: { userId } });

    if (!orders) {
      return res.status(404).json({ error: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
