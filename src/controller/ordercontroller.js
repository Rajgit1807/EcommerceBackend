const OrderService = require("../services/orderservice")

const createOrder = async (req, res) => {
    const user = await req.user;
    try {
        let createdOrder = await OrderService.createOrder(user, req.body);
        return res.status(201).send(createdOrder);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const findOrderById = async (req, res) => {
    const user = await req.user;
    try {
        let order = await OrderService.findOrderById(req.params.id);
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


const orderHistory = async (req, res) => {
    const user = await req.user;
    try {
        let orderHistory = await OrderService.usersOrderHistory(user._id);
        return res.status(200).send(orderHistory);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createOrder,
    findOrderById,
    orderHistory,
};