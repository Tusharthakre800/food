
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodpartnerRoutes = require('./routes/food-parter.routes');
const adminRoutes = require('./routes/admin.routes');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.disable('x-powered-by');

const allowedOrigins = [
  process.env.FRONTEND_URL
].filter(Boolean); 

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  accessControlAllowCredentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/foodpartner', foodpartnerRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
