const { medianScores } = require("./mappool");
const { getUniquePlayers,  getAvgMapsPlayed, playerParticipated, getMapsPlayed } = require('../../utils/matchUtils');
const { modNormalizer } = require('../../utils/statsUtils'); 


module.exports = { performanceStats };

// Individual statistics



/**
 * Calculates all the statistics displayed on the standard performance score page of a stats sheet, including
 * performance score, playcount, normalized avg score, avg acc and highest score
 * @param {Array<Map>} maps 
 * @param {Array<Match>} matches 
 */
function performanceStats(maps, matches, excluded) {
    if (!matches || !maps) {
        return false;
    }

    // Filter out games that were excluded
    const filteredMatches = filterGames(matches, excluded);

    // Get common information needed for each statistic calculation
    players = getUniquePlayers(filteredMatches);
    scores = players.map(player => getPlayerScores(filteredMatches, player.id, maps));

    // Generate statistics for each player
    const pscoreArr = pscores(maps, filteredMatches, players, scores);
    const playcountArr = playcounts(maps, filteredMatches, players, scores);
    const avgScoreArr = avgScore(maps, filteredMatches, players, scores);
    const avgAccArr = avgAcc(maps, filteredMatches, players, scores);
    const highestScoreArr = highestScore(maps, filteredMatches, players, scores);


    data = [];
    let notPlayer = 0;
    for (let i = 0; i < players.length; i++) {
        if (scores[i].length > 0) {
            playerStats = {
                'player': players[i],
                'pscore': pscoreArr[i - notPlayer].performanceScore,
                'mapsPlayed': playcountArr[i - notPlayer].mapsPlayed,
                'maxMapsPlayed': playcountArr[i - notPlayer].maxMapsPlayed,
                'avgScore': avgScoreArr[i - notPlayer].avgScore,
                'avgAcc': avgAccArr[i - notPlayer].avgAcc,
                'bestScore': highestScoreArr[i - notPlayer].bestScore,
                'bestMap': highestScoreArr[i - notPlayer].bestMap
            }

            data.push(playerStats);
        } else {
            notPlayer += 1;
        }
    }

    return data;

}




/**
 * Calculates the performance scores of each player who set a score in the given matches.
 * @param {Array<Map>} maps 
 * @param {Array<Match>} matches 
 * @param {Array<Player>} players 
 * @param {{score: Array<Score>, map: Number}} scores 
 * 
 * @returns {Array<{user: Player, performanceScore: Number}>}
 */
function pscores(maps, matches, players, scores) {
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
    const medians = medianScores(maps, matchGames); 
    const avgMapsPlayed = matches.map(match => getAvgMapsPlayed(match, maps));
    const matchesPlayed = players.map((player) => {
        return matches.map((match) => playerParticipated(match, player.id, maps));
    });

    // Calculate pscore for each player
    const data = [];
    for (let i = 0; i < players.length; i++) {
        const performanceScore = pscore(scores[i], medians, matchesPlayed[i], avgMapsPlayed);
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
 * @param {Array<{score: Number, map: Number}>} scores A list of scores that the player got and on which map
 * @param {Array<number>} medians A list of median scores of all players corresponding to scores
 * @param {Array<boolean>} matchesPlayed Array corresponding to matches that is true if player was present
 * @param {Array<number>} meanMapsPlayed Array corresponding to matches that holds the avg number of maps played per player
 */
function pscore(scores, medians, matchesPlayed, meanMapsPlayed) {
    if (scores.length === 0) {
        return false;
    } 

    let performanceScore = 0;

    for (let i = 0; i < scores.length; i++) {
        performanceScore += scores[i].score.score / medians[scores[i].map];
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
 * @param {Array<Player>} players 
 * @param {{score: Array<Score>, map: Number}} scores 
 * @returns {Array<{user: Player, mapsPlayed: Number, maxMapsPlayed: Number}>}
 */
function playcounts(maps, matches, players, scores) {
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
 * @param {Array<Player>} players 
 * @param {{score: Array<Score>, map: number}} scores 
 * @returns {Array<{user: Player, avgScore: number}>}
 */
function avgScore(maps, matches, players, scores) {
    data = [];

    for (let i = 0; i< players.length; i++) {
        if (scores[i].length > 0) {
            let avg = scores[i].reduce((total, value) => total + modNormalizer(value.score), 0)/scores[i].length;
            
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
 * @param {Array<Player>} players 
 * @param {{score: Array<Score>, map: Number}} scores 
 * @returns {Array<{user: Player, avgAcc: Number}>}
 */
function avgAcc(maps, matches, players, scores) {
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
 * Returns the highest mod normalized score each player got and on which map
 * @param {Array<Map>} maps 
 * @param {Array<Match>} matches 
 * @param {Array<Player>} players 
 * @param {{score: Array<Score>, map: Number}} scores 
 * @returns {Array<{user: Player, map: Map, bestScore: Number, 'bestMap': Map}>}
 */
function highestScore(maps, matches, players, scores) {
    data = [];

    for (let i = 0; i< players.length; i++) {
        if (scores[i].length > 0) {
            let best = scores[i].reduce((best, current) => {
                let newScore = modNormalizer(current.score);
                
                return ({
                    max: (newScore > best.max) ? newScore : best.max,
                    rank : (newScore > best.max) ? current.score.rank : best.rank,
                    map: (newScore > best.max) ? maps[current.map] : best.map
                });
            }, {max: 0, rank: null, map: null});
            

            data.push({
                'user': players[i],
                'bestScore': {score: best.max, rank: best.rank},
                'bestMap': best.map
            })
        }
    }
    return data;
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
 * @param {Map[]} maps
 * @returns {{score: Array<Score>, map: number}}
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


/**
 * Filters out excluded games from matches 
 * @param {Match[]} matches 
 * @param {Number[]} excluded 
 * @returns {Match[]}
 */
function filterGames(matches, excluded) {
    return matches.map((match) => {
        const filteredEvents = match.events.filter((event) => {
            const game = event.game;

            if (!game) return false;
            if (excluded.some(id => id == game.id)) return false;
            return true;
        })

        return {
            'match': match.match,
            'events': filteredEvents,
            'users': match.users,
            'first_event_id': match.first_event_id,
            'latest_event_id': match.latest_event_id
        }
    })
}