

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

    // Neither
    return false;
}



module.exports = { parseMatchId } 