/*const { Client } = require('pg')
const client = new Client({
    user: "postgres",
    password: 'postgres_password',
    host: 'localhost',
    port: '5432',
    database: 'complex_app_db'
})

client.connect()
.then(() => console.log("connected successfully"))
.catch(e => console.log(e))
.finally(() => client.end())
*/
// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { Pool } = require('pg');

const pgClient = new Pool({
    user: "postgres",
    password: 'postgres_password',
    host: 'postgres',
    port: '5432',
    database: 'complex_app_db'
});

pgClient.on('error', () => console.log('Lost PG connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err));

const values = pgClient.query('SELECT * from values');
console.log(values.rows);