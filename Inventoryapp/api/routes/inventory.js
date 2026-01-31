const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const { requireAuth } = require('../middleware/auth');

const environment = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[environment]);


router.get('/my-items', requireAuth, async (req, res) => {
  try {
    const items = await db('items')
      .where({ user_id: req.session.userId })
      .orderBy('created_at', 'desc');

    res.json(items);
  } catch (error) {
    console.error('Error fetching user inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});


router.get('/stats', requireAuth, async (req, res) => {
  try {
    const stats = await db('items')
      .where({ user_id: req.session.userId })
      .select(
        db.raw('COUNT(*) as total_items'),
        db.raw('SUM(quantity) as total_quantity'),
        db.raw('AVG(quantity) as avg_quantity')
      )
      .first();

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;