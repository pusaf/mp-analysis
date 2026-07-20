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

    if (response.status === 404) {
        console.log("match doesn't exist");
        return false;
    }

    if (!response.ok) {
        throw new Error(`osu API error: ${response.status}`);
        return false;
    }

    const match = await response.json();

    return match;
}




module.exports = { getMatch };
