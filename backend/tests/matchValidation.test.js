const { parseMatchId } = require("../src/utils/matchUtils");

test.skip("recognizes just mp ID", () => {
    expect(parseMatchId('119794867')).toBe(119794867);
});

test.skip("recognizes mp link", () => {
    expect(parseMatchId('https://osu.ppy.sh/community/matches/119794867')).toBe(119794867);
});

test.skip("mp link with minor changes fails", () => {
    expect(parseMatchId('https://osu.ppy.sh/community/ matches/119794867')).toBeFalsy();
});

test.skip("unrelated string fails", () => {
    expect(parseMatchId("yep")).toBeFalsy();
});

test.skip("id with letter fails", () => {
    expect(parseMatchId("11979486b7")).toBeFalsy();
});