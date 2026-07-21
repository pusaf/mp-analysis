const express = require("express");
const router = express.Router();

const { getMatches, refreshMatch } = require("../controllers/matchController");

router.post("/import", getMatches);
router.put("/:id", refreshMatch);

module.exports = router;