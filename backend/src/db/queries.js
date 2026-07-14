const pool = require('./pool');
const { getMatch } = require('../services/osu/osuServices'); 

// Takes an array of match IDs and returns a corresponding array of match objects
async function getMatches(ids) {
    const matches = await Promise.all(
        ids.map(async (id) => {
            const result = await pool.query("SELECT (data) FROM matches WHERE id = ($1)", [id]);

            return result.rows.length
                ? result.rows[0].data
                : importMatch(id);
        })
    )

    return matches;
}


// Imports a match into the db that isn't there yet
// Also returns the match object
async function importMatch(id) {
    console.log(`match ${id} not found in db, getting match from api`);

    matchObject = await getMatch(id);

    console.log(`match ${id} acquired`);

    // add info into match db
    await pool.query(
        `
        INSERT INTO matches (id, data)
        VALUES ($1, $2)
        ON CONFLICT (id) DO NOTHING
        `,
        [id, matchObject]
    );
    
    console.log(`match ${id} saved`);
    
    return matchObject;
}


module.exports = {getMatches}