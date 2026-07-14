process.loadEnvFile();

let accessToken = null;
let expiresAt = 0;

// Gets an access token for the osu!api v2. If a valid one already exists, returns that.
async function getAccessToken() {
    if (accessToken && Date.now() < expiresAt) {
        return accessToken;
    }

    const response = await fetch("https://osu.ppy.sh/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client_id: process.env.OSU_CLIENT_ID,
            client_secret: process.env.OSU_CLIENT_SECRET,
            grant_type: "client_credentials",
            scope: "public"
        })
    });

    const data = await response.json();

    accessToken = data.access_token;
    expiresAt = Date.now() + (data.expires_in - 60) * 1000;

    return accessToken;
}

module.exports = {getAccessToken};