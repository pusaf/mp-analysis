const { getAccessToken } = require("./auth");

// Gets a Match object from the osu API
async function getMatch(id) {
    const token = await getAccessToken();

    async function fetchMatch(before = null) {
        const url = new URL(`https://osu.ppy.sh/api/v2/matches/${id}`);

        url.searchParams.set("limit", "100");

        if (before !== null) {
            url.searchParams.set("before", before);
        }

        const response = await fetch(url, {
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
        }

        return await response.json();
    }

    const match = await fetchMatch();

    if (!match) {
        return false;
    }

    let events = [...match.events];

    while (events[0].id !== match.first_event_id) {
        const previous = await fetchMatch(events[0].id);

        events = [
            ...previous.events,
            ...events
        ];
    }

    return {
        ...match,
        events
    };
}




module.exports = { getMatch };
