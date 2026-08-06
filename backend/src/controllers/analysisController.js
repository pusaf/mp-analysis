const db = require('../db/queries');
const { performanceStats } = require('../services/stats/individual')

module.exports = { getIndividualPerformance };

async function getIndividualPerformance(req, res) {
    try {
        const { maps, matches } = req.body;

        const matchArr = await db.getMatches(matches);
        const stats = performanceStats(maps, matchArr);

        if (!stats) {
            return res.status(400).json({
                error: 'Maps and matches have no valid players'
            })
        }
        
        res.json(stats);

    } catch (err) {
        console.err(err);

        res.status(500).json({error: "Failed to get stats"});
    }
}
