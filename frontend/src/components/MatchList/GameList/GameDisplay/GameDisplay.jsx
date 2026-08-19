import styles from './game-display.module.css';

const GameDisplay = ({ game, users }) => {
    function findUser(id) {
        return users.find((user) => user.id === id);
    }

    if (game.team_type == "team-vs") {  
        return (<>
        
        </>);
    } else if (game.team_type == "head-to-head") {
        const sortedScores = game.scores.sort((a, b) => b.score - a.score);

        return (<>
            <li className={styles.game} 
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                        url(${game.beatmap.beatmapset.covers.cover})
                    `
                }}
            >
                <div>{game.beatmap.beatmapset.title} [{game.beatmap.version}]</div>
                <ul>
                    {sortedScores.map((score, index) => {
                        const player = findUser(score.user_id);
                        return (
                            <li key={`GAME${game.id}RANKING${index}`}>
                                <div>{player.username}</div>
                                <div>{Math.round(score.score)}</div>
                                <div>{(score.accuracy * 100).toFixed(2)}</div>
                                <div>{score.max_combo}</div>
                                <div>{`${score.statistics.count_300} ${score.statistics.count_100} ${score.statistics.count_50} ${score.statistics.count_miss}`}</div>
                            </li>
                        );
                    })}
                </ul>
            </li>
        </>);
    }
}




export default GameDisplay;