const db = require('../db/queries');

async function getStats(req, res) {
    try {
        const { maps, matches } = req.body;

        


    } catch (err) {
        console.err(err);

        res.status(500).json({error: "Failed to get stats"});
    }
}

module.exports = { getStats };