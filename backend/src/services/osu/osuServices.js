const { getAccessToken } = require("./auth");

/**
 * Gets a Match object from the osu API
 */
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
                "Authorization": `Bearer ${token}`,
                "x-api-version": "20220704"
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
    const users = new Map();

    // Add users from initial response
    match.users.forEach((user) => {
        users.set(user.id, user);
    });

    while (events[0].id !== match.first_event_id) {
        const previous = await fetchMatch(events[0].id);

        if (!previous) {
            break;
        }

        // Add users from older response
        previous.users.forEach((user) => {
            users.set(user.id, user);
        });

        events = [
            ...previous.events,
            ...events
        ];
    }

    return {
        ...match,
        events,
        users: [...users.values()]
    };
}




module.exports = { getMatch };
