module.exports = {
  development: {
  client: 'postgresql',
  connection: {
    host: 'db',          
    port: 5432,          
    database: 'zprefix',
    user: 'postgres',
    password: 'docker'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './db/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
},
}