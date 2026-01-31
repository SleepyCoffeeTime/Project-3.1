exports.up = function(knex) {
  return knex.schema.createTable('items', table => {
    table.increments('id');
    table.integer('user_id').notNullable();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.integer('quantity').defaultTo(0);
    table.string('image_url');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('items');
};