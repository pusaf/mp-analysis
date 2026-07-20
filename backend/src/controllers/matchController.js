const db = require("../db/queries");
const { parseMatchId } = require("../utils/matchUtils");

// Returns an array of match objects corresponding to the ids,
// skips over any fake ids
async function getMatches(req, res) {
    try {
        const { matches } = req.body;


        const ids = matches
            .map(line => parseMatchId(line))
            .filter(Boolean);
        
        const matchList = await db.getMatches(ids);

        res.json(matchList.filter(Boolean));
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to get matches"});
    }   
}


module.exports = { getMatches }

