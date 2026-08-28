const db = require('../db/queries');
const { performanceStats, individualLeaderboards } = require('../services/stats/individual')

module.exports = { getIndividualPerformance, getIndividualLeaderboards };

async function getIndividualPerformance(req, res) {
    try {
        const { maps, matches, excluded } = req.body;
        
        if (!Array.isArray(matches) || matches.length > 100) {
            return res.status(400).json({
                error: "A maximum of 100 matches can be analyzed at once"
            });
        }

        const matchArr = await db.getMatches(matches);
        const stats = performanceStats(maps, matchArr, excluded);

        if (!stats) {
            return res.status(400).json({
                error: 'Maps and matches have no valid players'
            })
        }
        
        res.json(stats);

    } catch (err) {
        console.error(err);

        res.status(500).json({error: "Failed to get individual stats"});
    }
}


async function getIndividualLeaderboards(req, res) {
    try {
        const { maps, matches, excluded } = req.body;

        if (!Array.isArray(matches) || matches.length > 100) {
            return res.status(400).json({
                error: "A maximum of 100 matches can be analyzed at once"
            });
        }
        
        const matchArr = await db.getMatches(matches);
        const leaderboards = individualLeaderboards(maps, matchArr, excluded);

        if (!leaderboards) {
            return res.status(400).json({
                error: 'Maps and matches have no valid players'
            })
        }

        res.json(leaderboards);

    }   catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to get individual leaderboards"})
    }
}