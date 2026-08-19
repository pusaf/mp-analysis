import styles from './performance-leaderboard.module.css'
import PerformanceRow from './PerformanceRow';

const PerformanceLeaderboard = ({ stats }) => {

    const sortedStats = stats.sort((a, b) => b.pscore - a.pscore);

    return (<div className={styles.flexCenter}>
        <div className={styles.card}>
            <table>
                <colgroup>
                    <col className={styles.participationAward} />
                    <col className={styles.placing} />
                    <col className={styles.pfp} />
                    <col className={styles.username} />
                    <col className={styles.pscore} />
                    <col className={styles.playcount} />
                    <col className={styles.avgScore} />
                    <col className={styles.avgAcc} />
                    <col className={styles.bestScoreRank} />
                    <col className={styles.bestScore} />
                    <col className={styles.bestMap} />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col"> </th>
                        <th scope="col">#</th>
                        <th colSpan="2" scope="colgroup">PLAYER</th>
                        <th scope="col">PSCORE</th>
                        <th scope="col">PLAYED</th>
                        <th scope="col">AVG. SCORE</th>
                        <th scope="col">AVG. ACC</th>
                        <th colSpan="4" scope="colgroup">HIGHEST SCORE</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedStats.map((userStats, index) => {
                        return <PerformanceRow userStats={userStats} index={index} key={`individualpscore${userStats.player.id}`}/>
                    })}
                </tbody>
            </table>
        </div>
    </div>)
}

export default PerformanceLeaderboard;