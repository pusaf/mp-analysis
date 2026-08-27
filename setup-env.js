const fs = require("fs");
const path = require("path");

if (!fs.existsSync("./backend/.env")) {
    const envPath = path.join("backend", ".env");
    fs.writeFileSync("./backend/.env", "");
    const envContent = 
`DATABASE_URL=postgresql://{your_username}:{your_password}@localhost:5432/mp_analyzer
OSU_CLIENT_ID=
OSU_CLIENT_SECRET=
`;
    fs.writeFileSync(envPath, envContent);
    console.log("Created .env in backend");
} else {
    console.log("\n.env already exists, leaving it unchanged.");
}