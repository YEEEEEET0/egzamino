const path = require('path');
require('dotenv').config({ path: `${path.resolve(__dirname + '/..')}/.env` });
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const cors = require('cors');
const dishesRouter = require('./routes/dishes');
const orderRouter = require('./routes/orders');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())

app.use('/user', userRouter);
app.use('/dishes', dishesRouter);
app.use('/orders', orderRouter);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const generateUniqueFileName = () => `${Date.now()}-${Math.round(Math.random() * 1000)}`;

app.post('/upload', (req, res) => {
    const uploadedFile = req.files.image;

    if (!uploadedFile) 
        return res.status(400).json({ message: 'No file provided' });
    


    const fileName = generateUniqueFileName();
    uploadedFile.mv(`${__dirname}/public/images/${fileName}.png`, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to upload image' });
        }
        res.status(200).json({ message: 'Image uploaded successfully', name: fileName });
    });
});

mongoose.connect(process.env.Mongo)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });