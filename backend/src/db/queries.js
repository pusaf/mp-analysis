const pool = require('./pool');
const { getMatch } = require('../services/osu/osuServices'); 

// Takes an array of match IDs and returns a corresponding array of match objects
async function getMatches(ids) {
    const matches = await Promise.all(
        ids.map(async (id) => {
            const result = await pool.query("SELECT (data) FROM matches WHERE id = ($1)", [id]);

            return result.rows.length
                ? result.rows[0].data
                : upsertMatch(id);
        })
    )

    matches.filter(match => match !== false);

    return matches;
}


// Upserts a match into the db
// Also returns the match object
async function upsertMatch(id) {

    const matchObject = await getMatch(id);

    if (!matchObject) {
        throw new Error(`Match ${id} does not exist`);
    }

    // add info into match db
    await pool.query(
        `
        INSERT INTO matches (id, data)
        VALUES ($1, $2)
        ON CONFLICT (id)
        DO UPDATE SET data = EXCLUDED.data
        `,
        [id, matchObject]
    );
    
    return matchObject;
}



module.exports = {getMatches, upsertMatch}