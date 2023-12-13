const express = require('express');
const orderRouter = express.Router();
const ordersController = require('../controllers/orders');
const { getAllOrders, getOrdersById, updateOrder, deleteOrder, addOrder, incrementRating } = ordersController;

const AccountModel = require('../models/user');

const checkAdmin = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Token not provided' });

    try {
        const decoded = jwt.verify(token, process.env.Secret);
        if (!decoded || !decoded.username) {
            res.cookie('token', '', { expires: new Date(0) });
            await SessionModel.findOneAndDelete({ sessionId });
            const user = await AccountModel.findOne({ 'sessions.jwtToken': token });

            if (user)
                user.sessions = user.sessions.filter(session => session.jwtToken !== token);

                console.log("invalidated")
            await user.save(); //delete the token if its invalid cause invalid either means its been tampered with or the secret aint working for it so its meh
            return res.status(401).json({ message: 'Invalid token' });
        }

        const user = await AccountModel.findOne({ username: decoded.username });
        if (!user || !user.admin)
            return res.status(401).json({ message: 'Unauthorized user' });

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Server error occurred" });
    }
};

orderRouter.get('/', getAllOrders);
orderRouter.get('/increment/:id', incrementRating);
orderRouter.get('/:id', getOrdersById);
orderRouter.post('/', checkAdmin, addOrder);
orderRouter.put('/:id', checkAdmin, updateOrder);
orderRouter.delete('/:id', checkAdmin, deleteOrder);

module.exports = orderRouter;