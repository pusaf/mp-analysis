const express = require("express");
const router = express.Router();
const rateLimit = require('express-rate-limit');

const { getIndividualPerformance } = require('../controllers/analysisController');

// Routes to implement:
// /individual/leaderboards (solo leaderboards)
// /individual/placements (some form of placement seeding)
// /team/leaderboard (tea, leaderboards)
// /individual/placements (some form of team seeding)
// / (a route that gets all of the above stats to reduce recalculation?)


const generalLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 60,
    standardHeaders: "draft-8",
    legacyHeaders: false,
});

router.post("/individual/performance", generalLimiter, getIndividualPerformance);

module.exports = router;