const DishModel = require('../models/dishes'); 

exports.getAllDishes = async (req, res) => {
    try {
        const dishes = await DishModel.find();
        res.status(200).json(dishes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

exports.getDishById = async (req, res) => {
    try {
        const dish = await DishModel.findById(req.params.id);
        if (!dish)
            return res.status(404).json({ message: 'Dish not found' });

        res.status(200).json(dish);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

exports.addDish = async (req, res) => {
    try {
        const newDish = await DishModel.create(req.body);
        res.status(201).json({ message: 'Dish added successfully', dish: newDish });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

exports.updateDish = async (req, res) => {
    try {
        const updateFields = { ...req.body };

        const dish = await DishModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true }
        );

        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        res.status(200).json({ message: 'Dish updated successfully', updatedDish: dish });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

exports.deleteDish = async (req, res) => {
    try {
        const dish = await DishModel.findByIdAndDelete(req.params.id);
        if (!dish)
            return res.status(404).json({ message: 'Dish not found' });

        res.status(200).json({ message: 'Dish deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};
