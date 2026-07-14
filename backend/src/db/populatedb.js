const { Client } = require("pg");
process.loadEnvFile();

const SQL = `
CREATE TABLE IF NOT EXISTS matches (
    id BIGINT PRIMARY KEY,
    data JSONB NOT NULL
);
`;

async function main() {
  console.log("seeding...");
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();