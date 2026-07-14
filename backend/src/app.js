const express = require("express");
const app = express();
const path = require("node:path");
const analysisRouter = require("./routes/analysisRouter");
const matchRouter = require("./routes/matchRouter");

app.use('/api/matches', matchRouter);
app.use('/api/analysis', analysisRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    console.log(`Listening on port ${PORT}`);
    if (error) {
        throw error;
    }
});
