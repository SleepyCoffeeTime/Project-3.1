const bcrypt = require('bcrypt');

exports.seed = async function(knex) {

  await knex('items').del();
  await knex('users').del();


  const password = await bcrypt.hash('password123', 10);


  const [user] = await knex('users').insert({
    username: 'demo',
    password: password
  }).returning('id');

  
  await knex('items').insert([
    {
      user_id: user.id,
      name: 'Laptop',
      description: 'Work laptop',
      quantity: 5
    },
    {
      user_id: user.id,
      name: 'Mouse',
      description: 'Wireless mouse',
      quantity: 10
    }
  ]);
};