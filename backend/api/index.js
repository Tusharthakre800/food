const app = require('../src/app');
const connectDB = require('../src/db/db');

// Connect to database before handling requests
// In Vercel serverless, this will reuse the connection if warm
connectDB();

module.exports = app;
