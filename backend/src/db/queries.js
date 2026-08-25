const pool = require('./pool');
const { getMatch } = require('../services/osu/osuServices'); 

// Takes an array of match IDs and returns a corresponding array of match objects
async function getMatches(ids) {
    const matches = await Promise.all(
        ids.map(async (id) => {
            const result = await pool.query({
                text: "SELECT (data) FROM matches WHERE id = ($1)",
                values: [id],
                statement_timeout: 10_000
            });

            return result.rows.length
                ? result.rows[0].data
                : upsertMatch(id);
        })
    )

    return matches.filter(match => match !== false);
}


// Upserts a match into the db
// Also returns the match object
async function upsertMatch(id) {

    const matchObject = await getMatch(id);

    if (!matchObject) {
        throw new Error(`Match ${id} does not exist`);
    }

    // add info into match db
    await pool.query({
        text: `
            INSERT INTO matches (id, data)
            VALUES ($1, $2)
            ON CONFLICT (id)
            DO UPDATE SET data = EXCLUDED.data
        `,
        values: [id, matchObject],
        statement_timeout: 10_000
    });
    
    return matchObject;
}



module.exports = {getMatches, upsertMatch}