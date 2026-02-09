
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodpartnerRoutes = require('./routes/food-parter.routes');
const cors = require('cors');





const app = express();
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));



app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/foodpartner', foodpartnerRoutes);





module.exports = app;