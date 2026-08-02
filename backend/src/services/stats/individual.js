const { medianScores } = require("./mappool");
const { getUniquePlayers,  getAvgMapsPlayed, playerParticipated, getMapsPlayed } = require('../../utils/matchUtils');
const { modNormalizer } = require('../../utils/statsUtils'); 



// Individual statistics

// TODO
// 1. Finish implementing each function
// 2. Create centralized "main" stats function to eliminate repeated calling of parsing functions (getting scores, players, etc.)


/**
 * Calculates the performance scores of each player who set a score in the given matches.
 * @param {*} maps 
 * @param {*} matches 
 * 
 * @returns {Array<id: number, username: string, pscore: number}>}
 */
function pscores(maps, matches) {
    if (!matches) {
        return false;
    }

    // Get the matchGames from matches
    const matchGames = [];
    matches.forEach((match) => {
        match.events.forEach((event) => {
            if (event.game) {
                matchGames.push(event.game);
            }
        });
    });

    // Get data needed to calculate pscore
    medians = medianScores(maps, matchGames); 
    avgMapsPlayed = matches.map(match => getAvgMapsPlayed(match, maps));
    players = getUniquePlayers(matches);

    scores = players.map(player => getPlayerScores(matches, player.id, maps));
    matchesPlayed = players.map((player) => {
        return matches.map((match) => playerParticipated(match, player.id, maps));
    });

    // Calculate pscore for each player
    data = [];
    for (let i = 0; i < players.length; i++) {
        performanceScore = pscore(scores[i], medians, matchesPlayed[i], avgMapsPlayed);
        if (performanceScore) {
            data.push({
                'user': players[i],
                'performanceScore': performanceScore
            })
        }
    }

    return data;
}

/**
 * Calculates the performance score of a single player using the formula found at https://shdewz.s-ul.eu/dDNCSB1u.png .
 * The value of map in scores corresponds to the index of the map in medians
 * 
 * @param {Array<{score: number, map: number}>} scores A list of scores that the player got and on which map
 * @param {Array<number>} medians A list of median scores of all players corresponding to scores
 * @param {Array<boolean>} matchesPlayed Array corresponding to matches that is true if player was present
 * @param {Array<number>} meanMapsPlayed Array corresponding to matches that holds the avg number of maps played per player
 */
function pscore(scores, medians, matchesPlayed, meanMapsPlayed) {
    if (scores.length === 0) {
        return false;
    } else if (meanMapsPlayed.length !== matchesPlayed.length) {
        return false;
    }

    let performanceScore = 0;

    for (let i = 0; i < scores.length; i++) {
        performanceScore += modNormalizer(scores[i].score) / medians[scores[i].map];
    }
    performanceScore /= scores.length;

    let matchCountNormalizer = 0
    for (let i = 0; i < matchesPlayed.length; i++) {
        if (matchesPlayed[i]) {
            matchCountNormalizer += meanMapsPlayed[i];
        }
    }

    performanceScore *= Math.cbrt(scores.length / matchCountNormalizer);
    return performanceScore;
}

/**
 * Calculates how many maps each player played out of possible maps they could have
 * @param {Array<Map>} maps 
 * @param {Array<Match>} matches 
 * @returns {Array<{user: Player, mapsPlayed: number, maxMapsPlayed: number}>}
 */
function playcounts(maps, matches) {

    players = getUniquePlayers(matches);
    scores = players.map(player => getPlayerScores(matches, player.id, maps));
    mapsPerMatch = matches.map(match => getMapsPlayed(match, maps));
    matchesPlayed = players.map((player) => {
        return matches.map((match) => playerParticipated(match, player.id, maps));
    });

    data = [];
    for (let i = 0; i < players.length; i++) {
        if (scores[i].length !== 0) {
            let maxMapsPlayed = 0;
            for (let j = 0; j < matches.length; j++) {
                if (matchesPlayed[i][j]) {
                    maxMapsPlayed += mapsPerMatch[j];
                }
            }

            data.push({
                'user': players[i],
                'mapsPlayed': scores[i].length,
                'maxMapsPlayed': maxMapsPlayed
            });
        }
    }

    return data;
}


/**
 * Calculates the mod normalized average score each player got
 * @param {Array<Map>} maps 
 * @param {Array<Match>} matches 
 * @returns {Array<{user: Player, avgScore: number}>}
 */
function avgScore(maps, matches) {
    
    players = getUniquePlayers(matches);
    scores = players.map(player => getPlayerScores(matches, player.id, maps));

    data = [];

    for (let i = 0; i< players.length; i++) {
        if (scores[i].length > 0) {
            let avg = scores[i].reduce((total, value) => total + value.score.score, 0)/scores[i].length;
            
            data.push({
                'user': players[i],
                'avgScore': avg
            })
        }
    }
    return data;
}


/**
 * Calculates the average accuracy each player got
 * @param {Array<Map>} maps 
 * @param {Array<Match>} matches 
 * @returns {Array<{user: Player, avgAcc: number}>}
 */
function avgAcc(maps, matches) {
    players = getUniquePlayers(matches);
    scores = players.map(player => getPlayerScores(matches, player.id, maps));

    data = [];

    for (let i = 0; i< players.length; i++) {
        if (scores[i].length > 0) {
            let avg = scores[i].reduce((total, value) => total + value.score.accuracy, 0)/scores[i].length ;
            
            data.push({
                'user': players[i],
                'avgAcc': avg
            })
        }
    }
    return data;
}

/**
 * Returns the highest mod normalized score each player got
 * @param {Array<Map>} maps 
 * @param {Array<Match>} matches 
 * @returns {Array<{user: Player, map: Map, highScore: number}>}
 */
function highestScore(maps, matches) {

}




function zPercentile() {

}

function leaderboard() {

}




// Helper functions 

/**
 * Finds every score a player set across all matches and which map it corresponds to
 *
 * @param {Match[]} matches
 * @param {number} playerId
 * @returns {Score[]}
 */
function getPlayerScores(matches, playerId, maps) {
    const scores = [];

    matches.forEach((match) => {
        match.events.forEach((event) => {
            const game = event.game;

            if (!game) return;

            game.scores.forEach((score) => {
                if (score.user_id === playerId) {
                    let counter = 0;
                    for (const map of maps) {
                        if (map.id == game.beatmap_id) {
                            break;
                        } else {
                            counter++;
                        }
                    }

                    if (counter < maps.length) {
                        scores.push({
                            score: score,
                            map: counter
                        });
                    }   
                }
            });
        });
    });


    return scores;
}




module.exports = { pscores, leaderboard, playcounts, avgScore, avgAcc }