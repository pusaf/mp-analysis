const express = require("express");
const router = express.Router();

const { getIndividualPerformance } = require('../controllers/analysisController');

// Routes to implement:
// /individual/leaderboards (solo leaderboards)
// /individual/placements (some form of placement seeding)
// /team/leaderboard (tea, leaderboards)
// /individual/placements (some form of team seeding)
// / (a route that gets all of the above stats to reduce recalculation?)

router.post("/individual/performance", getIndividualPerformance);

module.exports = router;