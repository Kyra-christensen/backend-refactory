const { Router } = require('express');
const Order = require('../models/Order');
// const pool = require('../utils/pool');

//insert async func
module.exports = Router()
  .post('/', async (req, res) => {
    // const { rows } = await pool.query(
    //   'INSERT INTO orders(product, quantity) VALUES ($1, $2) RETURNING *;',
    //   [req.body.product, req.body.quantity]
    // );
    const order = await Order.insert(req.body);

    res.json(order);
  })

  //getById async func
  .get('/:id', async (req, res) => {
    // const { rows } = await pool.query('SELECT * FROM orders WHERE id=$1;', [
    //   req.params.id,
    // ]);

    // if (!rows[0]) return null;
    const order = await Order.getById(req.params.id);

    res.json(order);
  })
  
  .get('/', async (req, res) => {
    // const { rows } = await pool.query('SELECT * FROM orders;');
    const orders = await Order.getAll();

    res.json(orders);
  })

  //getById async func
  .patch('/:id', async (req, res, next) => {
    try {
      // const { id } = req.params;
      const result = await Order.getById(req.params.id);
      // const existingOrder = result.rows[0];

      if (!result) {
        const error = new Error(`Order ${req.params.id} not found`);
        error.status = 404;
        throw error;
      }
      //updateById async func
      const product = req.body.product ?? result.product;
      const quantity = req.body.quantity ?? result.quantity;
      // const { rows } = await pool.query(
      //   'UPDATE orders SET product=$2, quantity=$3 WHERE id=$1 RETURNING *;',
      //   [id, product, quantity]
      // );
      const order = await Order.updateById(req.params.id, { product, quantity });

      res.json(order);
    } catch (error) {
      next(error);
    }
  })

  //deleteById async func
  .delete('/:id', async (req, res) => {
    // const { rows } = await pool.query(
    //   'DELETE FROM orders WHERE id=$1 RETURNING *;',
    //   [req.params.id]
    // );

    // if (!rows[0]) return null;
    const order = await Order.deleteById(req.params.id);

    res.json(order);
  });
