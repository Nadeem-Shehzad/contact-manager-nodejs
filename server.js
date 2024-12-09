const express = require('express');
const customErrorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/contacts',require('./routes/contactRoutes'));
app.use(customErrorHandler)

app.listen(PORT,() => {
    console.log(`Server is running on PORT : ${PORT}`);
});