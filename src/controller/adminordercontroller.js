const OrderService = require("../services/orderservice");

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrders();
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const confirmedOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await OrderService.confirmedOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const shippOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await OrderService.shippOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deliveredOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await OrderService.deliveredOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const cancelledOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await OrderService.cancelledOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const outForDeliveryOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await OrderService.outForDeliveryOrder(orderId)
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const deleteOrders = async (req, res) => {
    const orderId = req.params.orderId;
    try {
      const orders = await OrderService.deleteOrder(orderId);
      return res.status(200).send(orders);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };

  module.exports ={getAllOrders,confirmedOrders,shippOrders,deliveredOrders,deleteOrders,cancelledOrders,outForDeliveryOrders}