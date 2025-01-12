const CartItemService = require("../services/cartItemservice")

const updateCartItem = async (req, res) => {
    const user = await req.user;
    try {
        const updatedCartItem = await CartItemService.updateCartItem(user._id, req.params.id, req.body);
        return res.status(200).send(updatedCartItem);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const removeCartItem = async (req, res) => {
    const user = await req.user;
    try {
        await CartItemService.removeCartItem(user._id, req.params.id);
        return res.status(200).send({ message: "Cart item removed successfully" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = { updateCartItem, removeCartItem };