const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.Port || 8080;

const db = knex({
  client: 'pg',
  connection: {
    host: 'db',
    port: 5432,
    user: 'postgres',
    password: 'docker',
    database: 'zprefix'
  }
});


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});


app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  

  const hashedPassword = await bcrypt.hash(password, 10);
  

  const [user] = await db('users')
    .insert({
      username: username,
      password: hashedPassword
    })
    .returning(['id', 'username']);
  
  res.status(201).json({ message: 'User created', user });
});


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body; 
  
  const user = await db('users').where({ username }).first();
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const validPassword = await bcrypt.compare(password, user.password);
  
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  res.json({
    message: 'Login successful',
    userId: user.id,
    username: user.username
  });
});

app.get('/api/items', async (req, res) => {
  const items = await db('items')
    .join('users', 'items.user_id', 'users.id')
    .select('items.*', 'users.username as owner');
  
  res.json(items);
});


app.get('/api/items/user/:userId', async (req, res) => {
  const { userId } = req.params;
  
  const items = await db('items').where({ user_id: userId });
  
  res.json(items);
});


app.get('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  
  const item = await db('items').where({ id: id }).first();
  
  res.json(item);
});


app.post('/api/items', async (req, res) => {
  const { name, description, quantity, user_id } = req.body;
  
  const [item] = await db('items')
    .insert({
      name: name,
      description: description,
      quantity: quantity,
      user_id: user_id
    })
    .returning('*');
  
  res.status(201).json(item);
});


app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, quantity } = req.body;
  
  const [item] = await db('items')
    .where({ id: id })
    .update({
      name: name,
      description: description,
      quantity: quantity
    })
    .returning('*');
  
  res.json(item);
});


app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  
  await db('items').where({ id: id }).del();
  
  res.json({ message: 'Item deleted' });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});