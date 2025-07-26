const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

// Fetch all orders
app.get('/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY order_datetime DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add new order
app.post('/orders', async (req, res) => {
  const { order_id, order_datetime, mobile, address, items, total } = req.body;
  try {
    await pool.query(
      'INSERT INTO orders (order_id, order_datetime, mobile, address, items, total) VALUES ($1, $2, $3, $4, $5, $6)',
      [order_id, order_datetime, mobile, address, items, total]
    );
    res.status(201).send('Order created');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});