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

        res.status(200).json(matchList.filter(Boolean));
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to get matches"});
    }   
}

// Refreshes a specific match by possibly re-retrieving the match from the osu api
// Used if a match was previously fetched while not yet complete, and has now changed
async function refreshMatch(req, res) {
    try {
        const match = await db.upsertMatch(req.params.id);

        res.status(200).json(match);
    } catch (err) {
        console.error(err);

        if (err.message.includes("does not exist")) {
            return res.status(404).json({
                error: err.message
            });
        }

        res.status(500).json({
            error: "Failed to refresh match"
        });
    }
}


module.exports = { getMatches, refreshMatch }

