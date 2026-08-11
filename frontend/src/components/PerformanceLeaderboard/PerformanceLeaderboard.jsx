import styles from './performance-leaderboard.module.css'
import PerformanceRow from './PerformanceRow';

const PerformanceLeaderboard = ({ stats }) => {

    const sortedStats = stats.sort((a, b) => b.pscore - a.pscore);
    sortedStats.forEach((user) => console.log(user.bestScore));

    return (<div className={styles.card}>
        <table>
            <thead>
                <tr>
                    <th> </th>
                    <th>#</th>
                    <th>PLAYER</th>
                    <th>PSCORE</th>
                    <th>PLAYED</th>
                    <th>AVG. SCORE</th>
                    <th>AVG. ACC</th>
                    <th>HIGHEST SCORE</th>
                </tr>
            </thead>
            <tbody>
                {sortedStats.map((userStats, index) => {
                    return <PerformanceRow userStats={userStats} index={index} key={`individualpscore${userStats.player.id}`}/>
                })}

            </tbody>
        </table>
    </div>)
}

export default PerformanceLeaderboard;