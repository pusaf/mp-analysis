const { getAccessToken } = require("./auth");

// Gets a Match object from the osu API
async function getMatch(id) {
    const token = await getAccessToken();

    const response = await fetch(`https://osu.ppy.sh/api/v2/matches/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    const match = await response.json();
    // console.log(match.events);

    return match;
}


// getMatch(119794867);


module.exports = { getMatch };
