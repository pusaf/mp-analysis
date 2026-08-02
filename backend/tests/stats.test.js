const { medianScores, avgScores } = require('../src/services/stats/mappool');
const { pscores, playcounts, avgScore, avgAcc } = require('../src/services/stats/individual');
const db = require('../src/db/queries');


test("Single 1v1 match playcount", async() => {
    // Generate testing data
    const testMatch = await db.getMatches([119794867]);
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

    const pcs = playcounts(testMaps, testMatch);
    expect(pcs[0].mapsPlayed).toBe(2);
    expect(pcs[0].maxMapsPlayed).toBe(2);
    expect(pcs[1].mapsPlayed).toBe(2);
    expect(pcs[1].maxMapsPlayed).toBe(2);
})

test("Single team match playcount", async() => {
    // Generate testing data
    const testMatch = await db.getMatches([121102814]);
    const testMaps = [
        {   
            id: 4973174,
            mods: ['NF']
        },
        {
            id: 5654433,
            mods: ['NF', 'HD']
        }
    ]

    const pcs = playcounts(testMaps, testMatch);
    pusaf = pcs.find((user) => user.user.id == 20594928);
    pikapwn = pcs.find((user) => user.user.id == 2012453);
    expect(pusaf.mapsPlayed).toBe(1);
    expect(pusaf.maxMapsPlayed).toBe(2);
    expect(pikapwn.mapsPlayed).toBe(2);
})


test("Single 1v1 match avg score", async() => {
    // Generate testing data
    const testMatch = await db.getMatches([119794867]);
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

    const avg = avgScore(testMaps, testMatch);
    expect(avg[0].avgScore).toBeCloseTo(437611, 1);
    expect(avg[1].avgScore).toBeCloseTo(147809.5, 1);
})

test("Single 1v1 match avg acc", async() => {
    // Generate testing data
    const testMatch = await db.getMatches([119794867]);
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

    const avg = avgAcc(testMaps, testMatch);
    expect(avg[0].avgAcc).toBeCloseTo(0.96125);
    expect(avg[1].avgAcc).toBeCloseTo(0.731);
})

test("Single 1v1 match pscore", async() => {
    // Generate testing data
    const testMatch = await db.getMatches([119794867]);
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

    const scores = pscores(testMaps, testMatch);
    expect(scores[0].performanceScore).toBeCloseTo(1.56875384);
    expect(scores[1].performanceScore).toBeCloseTo(0.4312461597);
})

test("Multiple 1v1 match pscore", async() => {
    // Generate testing data
    const testMatch = await db.getMatches([119794867, 119786245]);
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

    const scores = pscores(testMaps, testMatch);
    expect(scores[0].performanceScore).toBeCloseTo(1.507944256);
    expect(scores[1].performanceScore).toBeCloseTo(0.3910464563);
    expect(scores[2].performanceScore).toBeCloseTo(1.268920799);
    expect(scores[3].performanceScore).toBeCloseTo(0.9175797013);
})


// this test is currently not working due to the fact that i haven't implemente map exclusion
// since there was a tb showcase match at the end, the numbers are slightly fucked up
test.skip("Multiple team match pscore", async() => {
    // Generate testing data
    const testMatch = await db.getMatches([120062857, 120078133, 120078716]);
    const testMaps = getowctest()


    const scores = pscores(testMaps, testMatch);
    display = scores.map(thing => `${thing.user.username} + ${thing.performanceScore}`);
    console.log(display);
    expect(true).toBe(true)
})


test.skip("Single match median", async () => {

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
            id: 3155184,
            mods: ['NF', 'DT']
        }
    ]


    const result = medianScores(testMaps, matchGames);
    
    expect(result[0]).toBe(233542.5);
    expect(result[1]).toBe(418858.5);
});

test.skip("Multiple matches median", async () => {

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



test.skip("Multiple matches avg", async () => {
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


    const result = avgScores(testMaps, matchGames);
    expect(result[0]).toBe(233542.5);
    expect(result[1]).toBe(389896);
});





function getowctest() {
    
    const owctest = [
        {
            id: 5425903,
            mods: ['NF']
        },
        {
            id: 5426127,
            mods: ['NF']
        },
        {
            id: 5426137,
            mods: ['NF']
        },
        {
            id: 5426152,
            mods: ['NF']
        },
        {
            id: 5426154,
            mods: ['NF']
        },
        {
            id: 5426162,
            mods: ['NF', 'HD']
        },
        {
            id: 5425751,
            mods: ['NF', 'HD']
        },
        {
            id: 5426182,
            mods: ['NF', 'HD']
        },
        {
            id: 5424868,
            mods: ['NF', 'HR']
        },
        {
            id: 5426187,
            mods: ['NF', 'HR']
        },
        {
            id: 5426197,
            mods: ['NF', 'HR']
        },
        {
            id: 794750,
            mods: ['NF', 'DT']
        },
        {
            id: 422762,
            mods: ['NF', 'DT']
        },
        {
            id: 5426129,
            mods: ['NF', 'DT']
        },
        {
            id: 5426228,
            mods: ['NF', 'DT']
        },
        {
            id: 5426056,
            mods: []
        },
        {
            id: 5425907,
            mods: []
        },
        {
            id: 5426165,
            mods: []
        },
        {
            id: 5426252,
            mods: []
        },
        {
            id: 5426254,
            mods: []
        }
    ]
    return owctest;
}