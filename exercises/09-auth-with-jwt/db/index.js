const pg = require('pg');
const { connectionString } = require('../config/db');

const db = new pg.Pool({ connectionString });

module.exports = db;
