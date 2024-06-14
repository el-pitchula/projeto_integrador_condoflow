const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Conectar ao banco de dados
connectDB();

// Middleware
app.use(express.json());

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/monitoring', require('./routes/monitoring'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
