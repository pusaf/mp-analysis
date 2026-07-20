const matchRouter = require('../src/routes/matchRouter');

const request = require("supertest");
const express = require("express");
const app = express();
const pool = require('../src/db/pool');

afterAll(async () => {
    await pool.end();
});

app.use(express.json());
app.use("/", matchRouter);

test("Single passed match id works", async () => {
    const res = await request(app)
        .post("/import")
        .send({
            matches: ["119794867"]
        });

    expect(res.body[0].match.name).toBe('5DCT6: (pusaf) vs (jykca)');
});

test("Single passed mp link works", async () => {
    const res = await request(app)
        .post("/import")
        .send({
            matches: ["https://osu.ppy.sh/community/matches/119794867"]
        });

    expect(res.body[0].match.name).toBe('5DCT6: (pusaf) vs (jykca)');
});

test("Multiple passed matches works", async () => {
    const res = await request(app)
        .post("/import")
        .send({
            matches: ["119794867","https://osu.ppy.sh/community/matches/119725659   "]
        });

    expect(res.body[0].match.name).toBe('5DCT6: (pusaf) vs (jykca)');
    expect(res.body[1].match.name).toBe('5DCT6: (pusaf) vs (Lexic)');
});

test("One incorrect match is skipped", async () => {
    const res = await request(app)
        .post("/import")
        .send({
            matches: ["119794867","https://osu.ppy.sh/communit y/matches/119725659   "]
        });

    expect(res.body[0].match.name).toBe('5DCT6: (pusaf) vs (jykca)');
    expect(res.body.length).toBe(1);
});

test("Fake id is skipped", async () => {
    const res = await request(app)
        .post("/import")
        .send({
            matches: ["1231231231232"]
        });

    expect(res.body.length).toBe(0);
});