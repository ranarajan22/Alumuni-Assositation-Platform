/* eslint-disable no-undef */
const express = require('express');
const http = require('http');
//const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initSocket } = require('./socket/socket'); // Initialize socket events
const AuthRouter = require('./Routes/AuthRouter');
const AuthAlumniRouter = require('./Routes/AuthAlumniRoutes');
const uploadRoute = require('./Routes/routeUpload');
const eventRouter = require('./Routes/eventRoutes');
const messageRoutes = require('./Routes/messageRoutes');
const userRoutes = require('./Routes/userRoutes');
const connectCloudinary = require('./utils/cloudinary');
const AdminRoutes = require('./Routes/AdminRoutes');
require('./Models/db'); // Ensure database connection is established

// Connect to Cloudinary
connectCloudinary();

const app = express();
const server = http.createServer(app); // Create HTTP server

// Initialize Socket.IO
initSocket(server);

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Test route to ensure server is running
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Define all routes
app.use('/auth', AuthRouter);
app.use('/api/alumni', AuthAlumniRouter);
app.use('/api/student/upload', uploadRoute);
app.use('/api/alumni/upload', uploadRoute);
app.use('/api/events', eventRouter);
app.use('/api/messages', messageRoutes);
app.use('/api/user', userRoutes);
app.use('/admin', AdminRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
