import styles from './game-display.module.css';

const GameDisplay = ({ game, users }) => {
    function findUser(id) {
        return users.find((user) => user.id === id);
    }

    let sortedScores = null;
    let redScore = 0;
    let blueScore = 0;
    let winner = null;

    // Sort scores to be displayed in order
    if (game.team_type == 'team-vs') {
        const redTeam = game.scores.filter((score) => score.match.team == "red");
        const blueTeam = game.scores.filter((score) => score.match.team == "blue");
        redScore = redTeam.reduce((score, total) => total+score, 0);
        blueScore = blueTeam.reduce((score, total) => total+score, 0);
        if (redScore - blueScore) {
            sortedScores = redTeam.sort((a, b) => b.score - a.score).concat(blueTeam.sort((a, b) => b.score - a.score));
            winner = 'red';
        } else if (blueScore - redScore) {
            sortedScores = blueTeam.sort((a, b) => b.score - a.score).concat(redTeam.sort((a, b) => b.score - a.score));
            winner = 'blue';
        } else {
            sortedScores = redTeam.sort((a, b) => b.score - a.score).concat(blueTeam.sort((a, b) => b.score - a.score));
            winner = 'tie';
        }
    } else {    
        sortedScores = game.scores.sort((a, b) => b.score - a.score);
    }

    let modStr = game.mods.reduce((str, mod, index) => {
        if (index == 0) {
            return str + mod;
        } else {
            return str + ", " + mod;
        }
    }, "");


    const gameHeader = (
        <div className={styles.gameHeader}
            style={{
                backgroundImage: `
                    linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                    url(${game.beatmap.beatmapset.covers.cover})
                `
            }}
        >
            <div>{game.beatmap.beatmapset.title} [{game.beatmap.version}]</div>
            <div>{modStr}</div>

        </div>
    )


    return (<>
        <li className={styles.game}>
            {gameHeader}
            <ul>
                {sortedScores.map((score, index) => {
                    const player = findUser(score.user_id);
                    return (
                        <li key={`GAME${game.id}RANKING${index}`}>
                            <div className={`${styles.score} ${styles[`${score.match.team}Team`]}`}>
                                <div>{player.username}</div>
                                <div>
                                    <div className={styles.score2}>
                                        <div>
                                            <span className={styles.label}>Combo</span>
                                            <span>{score.max_combo}</span>
                                        </div>
                                        <div>
                                            <span className={styles.label}>Accuracy</span>
                                            <span>{(score.accuracy * 100).toFixed(2)}%</span>
                                        </div>
                                        <div>
                                            <span className={styles.label}>Score</span>
                                            <span className={styles.scoreStat}>{Math.round(score.score)}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.score2} ${styles.hitCount}`}>
                                        <div>
                                            <span className={styles.label}>Great </span>
                                            <span>{score.statistics.count_300}</span>
                                        </div>
                                        <div>
                                            <span className={styles.label}>Ok </span>
                                            <span>{score.statistics.count_100}</span>
                                        </div>
                                        <div>
                                            <span className={styles.label}>Meh </span>
                                            <span>{score.statistics.count_50}</span>
                                        </div>
                                        <div>
                                            <span className={styles.label}>Miss </span>
                                            <span>{score.statistics.count_miss}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </li>
    </>);
}



export default GameDisplay;