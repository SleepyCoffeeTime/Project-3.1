const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const { requireAuth, optionalAuth } = require('../middleware/auth');

const environment = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[environment]);

router.get('/', optionalAuth, async (req, res) => {
  try {
    const items = await db('items')
      .join('users', 'items.user_id', 'users.id')
      .select(
        'items.*',
        'users.username as owner_username'
      )
      .orderBy('items.created_at', 'desc');

    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const item = await db('items')
      .join('users', 'items.user_id', 'users.id')
      .where('items.id', req.params.id)
      .select(
        'items.*',
        'users.username as owner_username'
      )
      .first();

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, description, quantity, image_url } = req.body;

    if (!name || !description || quantity === undefined) {
      return res.status(400).json({ error: 'Name, description, and quantity are required' });
    }

    const [item] = await db('items')
      .insert({
        user_id: req.session.userId,
        name,
        description,
        quantity,
        image_url: image_url || null
      })
      .returning('*');

    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});


router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { name, description, quantity, image_url } = req.body;

    const item = await db('items')
      .where({ id: req.params.id, user_id: req.session.userId })
      .first();

    if (!item) {
      return res.status(404).json({ error: 'Item not found or unauthorized' });
    }

    const [updatedItem] = await db('items')
      .where({ id: req.params.id })
      .update({
        name: name || item.name,
        description: description || item.description,
        quantity: quantity !== undefined ? quantity : item.quantity,
        image_url: image_url !== undefined ? image_url : item.image_url,
        updated_at: db.fn.now()
      })
      .returning('*');

    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Failed to update item' });
  }
});


router.delete('/:id', requireAuth, async (req, res) => {
  try {

    const item = await db('items')
      .where({ id: req.params.id, user_id: req.session.userId })
      .first();

    if (!item) {
      return res.status(404).json({ error: 'Item not found or unauthorized' });
    }

    await db('items')
      .where({ id: req.params.id })
      .delete();

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;