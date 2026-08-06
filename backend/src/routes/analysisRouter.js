const express = require("express");
const router = express.Router();

const { getIndividualPerformance } = require('../controllers/analysisController');

router.post("/individual/performance", getIndividualPerformance);

module.exports = router;