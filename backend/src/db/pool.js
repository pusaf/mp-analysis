const { Pool } = require("pg");
process.loadEnvFile();

module.exports = new Pool({
    connectionString: process.env.DATABASE_URL
});