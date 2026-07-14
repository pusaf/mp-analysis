const { Client } = require("pg");
process.loadEnvFile();

const SQL = `
CREATE TABLE IF NOT EXISTS players (
    id BIGINT PRIMARY KEY,
    username TEXT NOT NULL,
    country_code CHAR(2),
    avatar_url TEXT
);

CREATE TABLE IF NOT EXISTS beatmaps (
    id BIGINT PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT,
    difficulty_name TEXT,
    creator TEXT,
    star_rating REAL,
    bpm REAL,
    length_seconds INTEGER,
    circle_size REAL,
    approach_rate REAL,
    overall_difficulty REAL,
    hp_drain REAL,
    mode TEXT,
    background_url TEXT
);

CREATE TABLE IF NOT EXISTS matches (
    id BIGINT PRIMARY KEY,
    name TEXT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    imported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS games (
    id BIGINT PRIMARY KEY,
    match_id INTEGER NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
    beatmap_id BIGINT NOT NULL REFERENCES beatmaps(id),
    mods TEXT,
    scoring_type TEXT,
    team_type TEXT,
    mode TEXT,
    start_time TIMESTAMP,
    end_time TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_id BIGINT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    player_id BIGINT NOT NULL REFERENCES players(id),

    score INTEGER NOT NULL,
    accuracy REAL,
    max_combo INTEGER,

    count_300 INTEGER,
    count_100 INTEGER,
    count_50 INTEGER,
    count_miss INTEGER,

    passed BOOLEAN,
    team TEXT,
    rank INTEGER
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