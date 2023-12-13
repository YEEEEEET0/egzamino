const DishModel = require('../models/dishes');
const OrderModel = require('../models/orders');
const JWT = require('jsonwebtoken');

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

exports.getOrdersById = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        if (!order)
            return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

exports.addOrder = async (req, res) => {
    try {
        const { items, customer, totalPrice, status } = req.body;
        const requiredFields = { items, customer, totalPrice, status };
        const missingFields = Object.keys(requiredFields).filter(key => !requiredFields[key]);

        if (missingFields.length > 0)
            return res.status(400).json({ message: `Missing required field(s): ${missingFields.join(', ')}` });


        const service = await OrderModel.create({ items, customer, totalPrice, status });
        const savedService = await service.save();

        res.status(201).json({ message: 'Order added successfully', order: savedService });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

exports.getCookieOrders = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.status(401).json({ errorMessage: "Not logged in" });

        const decoded = JWT.verify(token, process.env.Secret);
        if (!decoded) return res.status(401).json({ errorMessage: "Invalid or expired token" });

        const user = await AccountModel.findById(decoded.user);
        if (!user) return res.status(404).json({ errorMessage: "User not found" });

        const orders = await OrderModel.find({ /* to:do */ });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for the user' });
        }

        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errorMessage: "Failed to fetch orders" });
    }
};

exports.incrementRating = async (req, res) => {
    try {
        const { id } = req.params;

        const token = req.cookies.token;
        if (!token) return res.status(401).json({ errorMessage: "Not logged in" });

        const decoded = JWT.verify(token, process.env.Secret);
        if (!decoded) return res.status(401).json({ errorMessage: "Invalid or expired token" });

        const order = await DishModel.findById(id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (!order.usersRated) {
            order.usersRated = [];
        }

        const userIndex = order.usersRated.indexOf(decoded.user);
        if (userIndex === -1) {
            order.rating = (order.rating || 0) + 1;
            order.usersRated.push(decoded.user);
        } else {
            order.rating = Math.max((order.rating || 0) - 1, 0);
            order.usersRated.splice(userIndex, 1);
        }

        await DishModel.findByIdAndUpdate(id, {
            $set: { usersRated: order.usersRated, rating: order.rating }
        });

        const updatedOrder = await DishModel.findById(id);

        return res.status(200).json({ message: 'Rating toggled successfully', order: updatedOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errorMessage: "Failed to toggle rating" });
    }
};



exports.updateOrder = async (req, res) => {
    try {
        const updateFields = {};
        const { items, customer, totalPrice, status } = req.body;

        if (items)
            updateFields.items = items;

        if (customer)
            updateFields.customer = customer;

        if (totalPrice)
            updateFields.totalPrice = totalPrice;

        if (status)
            updateFields.status = status;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'At least one field to update is required' });
        }

        const order = await OrderModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true }
        );

        if (!order)
            return res.status(404).json({ message: 'Order not found' });

        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await OrderModel.findByIdAndDelete(req.params.id);
        if (!order)
            return res.status(404).json({ message: 'Order not found' });

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};
