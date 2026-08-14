import styles from './performance-leaderboard.module.css'


const PerformanceRow = ({ userStats, index }) => {


    // WIP
    // Potentially implemement a standard mappool naming system in order to better display best map
    // + styling

    let modStr = "";
    if (userStats.bestMap.mods.length == 0) {
        modStr = "FM"
    } else {
        modStr = userStats.bestMap.mods.reduce((str, mod, index) => {
            if (index == 0) {
                return str + mod;
            } else {
                return str + ", " + mod;
            }
        }, "");
    }

    const rankColor = userStats.bestScore.rank.toLowerCase();

    console.log(userStats.bestMap);

    return (<>
        <tr>
            <td>{userStats.mapsPlayed / userStats.maxMapsPlayed >= 0.7 ? <img src="/img/goldstar.svg" alt="star" /> : ""}</td>
            <td>#{index + 1}</td>
            <td><img src={userStats.player.avatar_url} alt="pfp"></img></td>
            <td><a
                href={`https://osu.ppy.sh/users/${userStats.player.username}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}>
                    {userStats.player.username}
            </a></td>
            <td>{userStats.pscore.toFixed(2)}</td>
            <td>{userStats.mapsPlayed}/{userStats.maxMapsPlayed}</td>
            <td>{Math.round(userStats.avgScore).toLocaleString("en-us")}</td>
            <td>{(userStats.avgAcc * 100).toFixed(2)}%</td>
            <td className={styles[rankColor]}>{userStats.bestScore.rank + ' '}</td>
            <td>{userStats.bestScore.score.toLocaleString('en-us')}</td>
            <td>
                <a
                    href={`https://osu.ppy.sh/beatmaps/${userStats.bestMap.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                >
                    <span className={styles.mapName}>{userStats.bestMap.name}</span>
                    <span className={styles.diffContainer}>
                        <span className={styles.diff}>{userStats.bestMap.diff}</span>
                    </span>
                </a>
            </td>
            <td>+{modStr}</td>
        </tr>
    </>)
}

export default PerformanceRow;