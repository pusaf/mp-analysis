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

    return await response.json();
}

