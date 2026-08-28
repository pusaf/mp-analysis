const express = require("express");
const router = express.Router();
const rateLimit = require('express-rate-limit');

const { getMatches, refreshMatch } = require("../controllers/matchController");

const matchLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 60,
    standardHeaders: "draft-8",
    legacyHeaders: false,
});

router.post("/import", matchLimiter, getMatches);
router.put("/:id", matchLimiter, refreshMatch);

module.exports = router;