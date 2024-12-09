const express = require('express');
const customErrorHandler = require('./middlewares/errorHandler');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/dbConnection');
require('dotenv').config();
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/contacts', contactRoutes);
app.use('/api/user', userRoutes);
app.use(customErrorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
});