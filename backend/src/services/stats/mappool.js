const {median, mean, arraysEqual} = require("../../utils/statsUtils");


// Gets the median scores of maps in matchGames
// Takes in an array of maps and an array of MatchGame objects
function medianScores(maps, matchGames) {
    return maps.map((map) => {
        const scores = matchGames
            .filter((matchGame) => {
                return (map.id == matchGame.beatmap_id && arraysEqual(map.mods,matchGame.mods))
            })
            .flatMap((matchGame) => matchGame.scores);
        

        return medianScore(scores);
    });
}

// Gets the median score of an array of scores
// Takes in an array of score objects
function medianScore(scores) {
    values = scores.map((score) => score.score);
    if (values.length == 0) {
        return null;
    }

    return median(values);
}

// Gets the average scores of maps in matchGames
// Takes in an array of maps and an array of MatchGame objects
function avgScores(maps, matchGames) {
    return maps.map((map) => {
        const scores = matchGames
            .filter((matchGame) => {
                return (map.id == matchGame.beatmap_id && arraysEqual(map.mods,matchGame.mods))
            })
            .flatMap((matchGame) => matchGame.scores);
        

        return avgScore(scores);
    });
}

// Gets the mean score of an array of scores
// Takes in an array of score objects
function avgScore(scores) {
    values = scores.map((score) => score.score);
    if (values.length == 0) {
        return null;
    }

    return mean(values);
}



module.exports = { medianScores, avgScores };