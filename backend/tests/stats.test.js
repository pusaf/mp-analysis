const { medianScores } = require('../src/services/stats/mappool');
const db = require('../src/db/queries');


async function testing() {
    
}


test("Single match", async () => {

    // Generate testing data
    const testMatch = await db.getMatches([119794867]);
    const matchGames = testMatch[0].events
        .filter((event) => (event.detail.type == "other"))
        .map((event) => event.game);

    const testMaps = [
        {   
            id: 4072324,
            mods: ['NF']
        },
        {
            id: 5132406,
            mods: ['NF']
        }
    ]


    const result = medianScores(testMaps, matchGames);
    
    expect(result[0]).toBe(233542.5);
    expect(result[1]).toBe(351878)
});

test("Multiple matches", async () => {

    // Generate testing data
    const testMatch1 = await db.getMatches([119794867]);
    const testMatch2 = await db.getMatches([119786245]);
    let matchGames = [
        ... testMatch1[0].events
        .filter((event) => (event.detail.type == "other"))
        .map((event) => event.game),
        ... testMatch2[0].events
        .filter((event) => (event.detail.type == "other"))
        .map((event) => event.game)
    ]; 

    const testMaps = [
        {   
            id: 4072324,
            mods: ['NF']
        },
        {
            id: 5132406,
            mods: ['NF']
        }
    ]


    const result = medianScores(testMaps, matchGames);
    expect(result[0]).toBe(233542.5);
    expect(result[1]).toBe(391414.5)
});


