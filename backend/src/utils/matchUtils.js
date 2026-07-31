

// Parses the match ID out of a string. 
// Returns the false if the string is not an mp link or ID.
// Will accept IDs that may not be real IDs so long as they are in the correct form
function parseMatchId(str) {
    const newStr = str.trim();
    
    // Check for raw ID
    if (/^[1-9][0-9]{0,20}$/.test(newStr)) {
        return Number(newStr);
    }

    // Check for mp link
    if (/^(https:\/\/)?osu\.ppy\.sh\/community\/matches\/[1-9][0-9]{0,20}$/.test(newStr)) {
        return Number(newStr.replace("https://osu.ppy.sh/community/matches/","").replace("osu.ppy.sh/community/matches/",""));
    }
    if (/^(https:\/\/)?osu\.ppy\.sh\/mp\/[1-9][0-9]{0,20}$/.test(newStr)) {
        return Number(newStr.replace("https://osu.ppy.sh/mp/","").replace("osu.ppy.sh/mp/",""));
    }

    // Neither
    return false;
}



/**
 * Gets every unique player across all matches.
 *
 * @param {Match[]} matches
 * @returns {User[]} Array of unique users.
 */
function getUniquePlayers(matches) {
    const players = new Map();

    matches.forEach((match) => {
        match.users.forEach((user) => {
            players.set(user.id, user);
        });
    });

    return [...players.values()];
}


/**
 * Counts how many separate matches each player appears in.
 *
 * @param {Match[]} matches
 * @param {User[]} players
 * @returns {number[]} Match counts in the same order as players.
 */
function countPlayerMatches(matches, players) {
    const counts = new Map();

    // Initialize all players with 0 matches
    for (const player of players) {
        counts.set(player.id, 0);
    }

    // Count appearances
    for (const match of matches) {
        for (const user of match.users) {
            counts.set(user.id, counts.get(user.id) + 1);
        }
    }

    // Return counts in the same order as players
    return players.map(player => counts.get(player.id));
}



/**
 * Gets the average number of maps played per player in a match. Only considers maps in maps
 *
 * @param {Match} match
 * @param {Array<Map>} maps
 * @returns {number}
 */
function getAvgMapsPlayed(match, maps) {
    const playerMaps = new Map();

    match.events.forEach((event) => {
        const game = event.game;

        if (!game) return;
        if (!maps.some(map => map.id === game.beatmap_id)) {
            return;
        }

        const playersInGame = new Set(
            game.scores.map(score => score.user_id)
        );

        playersInGame.forEach((userId) => {
            playerMaps.set(
                userId,
                (playerMaps.get(userId) ?? 0) + 1
            );
        });
    });

    if (playerMaps.size === 0) {
        return 0;
    }

    const totalMaps = [...playerMaps.values()]
        .reduce((sum, count) => sum + count, 0);

    return totalMaps / playerMaps.size;
}


/**
 * Checks if a player participated in any map in a match. Only considers maps in maps.
 *
 * @param {Match} match
 * @param {number} playerId
 * @param {Array<Map>} maps
 * @returns {boolean}
 */
function playerParticipated(match, playerId, maps) {
    return match.events.some((event) => {
        const game = event.game;

        if (!game) return false;
        if (!maps.some(map => map.id === game.beatmap_id)) {
            return;
        }

        return game.scores.some(score => score.user_id === playerId);
    });
}



module.exports = { parseMatchId, getUniquePlayers, countPlayerMatches, getAvgMapsPlayed, playerParticipated } 