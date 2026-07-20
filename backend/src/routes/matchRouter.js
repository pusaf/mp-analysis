const express = require("express");
const router = express.Router();

const { getMatches } = require("../controllers/matchController");

router.post("/import", getMatches);

module.exports = router;