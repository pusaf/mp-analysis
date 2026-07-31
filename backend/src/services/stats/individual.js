const { medianScores } = require("./mappool");
const { getUniquePlayers,  getAvgMapsPlayed, playerParticipated } = require('../../utils/matchUtils');
const { modNormalizer } = require('../../utils/statsUtils'); 



// Individual statistics

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


function playcount(players, scores) {

}

function avgScore(players, scores) {

}

function avgAcc(players, scores) {
    
}

function highestScore(players, scores) {

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




module.exports = { pscores, leaderboard }