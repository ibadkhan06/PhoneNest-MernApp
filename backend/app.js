const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const notfound = require('./middleware/notfound');

const uploads = require('./routes/uploads');
const users = require('./routes/users');
const categories = require('./routes/categories');
const products = require('./routes/products');
const orders = require('./routes/orders');

const app = express();

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost", "http://localhost:80"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cookie-parser')());

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/uploads', uploads);
app.use('/api/users', users);
app.use('/api/categories', categories);
app.use('/api/products', products);
app.use('/api/orders', orders);

// Handle 404 errors
app.use(notfound);

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO with CORS options
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost", "http://localhost:80"],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});

// WebSocket events
io.on('connection', (socket) => {
  console.log('New WebSocket connection:', socket.id);

  // Handle chat messages
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  // Handle typing status
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('WebSocket connection closed:', socket.id);
  });
});

// Connect to MongoDB and start the server
const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('DB connected');
    server.listen(4000, () => {
      console.log('Listening on port 4000');
    });
  } catch (error) {
    console.error('Error connecting to DB:', error);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('DB disconnected');
});

conn();
