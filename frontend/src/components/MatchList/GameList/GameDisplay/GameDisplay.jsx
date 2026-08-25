import styles from './game-display.module.css';
import { useState, useEffect } from 'react';
import { arraysEqual } from '../../../../utils/generalUtils';

const GameDisplay = ({ game, users, excludedGames, setExcludedGames, maps }) => {

    // Don't bother allowing the map to be added/removed from excludedGames if the map isn't active 
    const [inactive, setInactive] = useState(
        (maps.some(map => game.beatmap.id == map.id && arraysEqual(game.mods, map.mods) && !map.selected))
    );

    useEffect(() => {
        setInactive((maps.some(map => game.beatmap.id == map.id && arraysEqual(game.mods, map.mods) && !map.selected)));
    }, [maps])

    function findUser(id) {
        return users.find((user) => user.id === id);
    }

    function handleCheck(e) {
        if (inactive) return;

        const gameId = Number(e.target.value);

        setExcludedGames(prev => {
            const updated = new Set(prev);

            if (updated.has(gameId)) {
                updated.delete(gameId);
            } else {
                updated.add(gameId);
            }
            return updated;
        });
    }

    let sortedScores = null;
    let redScore = 0;
    let blueScore = 0;
    let winner = null;
    let differential = null;

    // Sort scores to be displayed in order
    if (game.team_type == 'team-vs') {
        const redTeam = game.scores.filter((score) => score.match.team == "red");
        const blueTeam = game.scores.filter((score) => score.match.team == "blue");
        redScore = redTeam.reduce((total, score) => total + score.score, 0);
        blueScore = blueTeam.reduce((total, score) => total+score.score, 0);
        if (redScore - blueScore > 0) {
            sortedScores = redTeam.sort((a, b) => b.score - a.score).concat(blueTeam.sort((a, b) => b.score - a.score));
            differential = redScore - blueScore;    
            winner = 'Red';
        } else if (blueScore - redScore > 0) {
            sortedScores = blueTeam.sort((a, b) => b.score - a.score).concat(redTeam.sort((a, b) => b.score - a.score));
            differential = blueScore - redScore;
            winner = 'Blue';
        } else {
            sortedScores = redTeam.sort((a, b) => b.score - a.score).concat(blueTeam.sort((a, b) => b.score - a.score));
            winner = 'Tie';
        }
    } else {    
        sortedScores = game.scores.sort((a, b) => b.score - a.score);
    }

    // Generate string to represent mods, may be replaced with mod assets later
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
            <label htmlFor={`excluded${game.id}`}></label>
            <input
                type="checkbox"
                value={game.id}
                id={`excluded${game.id}`}
                checked={!excludedGames.has(game.id)}
                onChange={handleCheck}
                disabled={inactive}
            />
            <div>
                <div>{game.beatmap.beatmapset.title} [{game.beatmap.version}]</div>
                <div>{modStr}</div>
            </div>
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
                                            <span>{score.max_combo.toLocaleString("en-us")}</span>
                                        </div>
                                        <div>
                                            <span className={styles.label}>Accuracy</span>
                                            <span>{(score.accuracy * 100).toFixed(2)}%</span>
                                        </div>
                                        <div>
                                            <span className={styles.label}>Score</span>
                                            <span className={styles.scoreStat}>{Math.round(score.score).toLocaleString("en-us")}</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.score2} ${styles.hitCount}`}>
                                        <div>
                                            <span className={styles.label}>Great </span>
                                            <span>{score.statistics.count_300.toLocaleString("en-us")}</span>
                                        </div>
                                        <div>
                                            <span className={styles.label}>Ok </span>
                                            <span>{score.statistics.count_100.toLocaleString("en-us")}</span>
                                        </div>
                                        <div>
                                            <span className={styles.label}>Meh </span>
                                            <span>{score.statistics.count_50.toLocaleString("en-us")}</span>
                                        </div>
                                        <div>
                                            <span className={styles.label}>Miss </span>
                                            <span>{score.statistics.count_miss.toLocaleString("en-us")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            
            {winner ? 
            <div>
                <div className={styles.teamScores}>
                    <div className={styles.redScore}>
                        <div className={styles.label}>Red Team</div>
                        <b>{redScore.toLocaleString("en-us")}</b>
                    </div>
                    <div className={styles.blueScore}>
                        <div className={styles.label}>Blue Team</div>
                        <b>{blueScore.toLocaleString("en-us")}</b>
                    </div>
                </div>
                {differential ?
                <div className={styles.differential}>
                    <b>{winner} Team</b>
                    <span>&nbsp;wins by {differential.toLocaleString("en-us")}</span>
                </div>
                : ''
                }
            </div>
            : ""
            }
        </li>
    </>);
}



export default GameDisplay;