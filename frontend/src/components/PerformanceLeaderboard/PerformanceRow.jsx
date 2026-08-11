

const PerformanceRow = ({ userStats, index }) => {


    // WIP
    // Potentially implemement a standard mappool naming system in order to better display best map
    // + styling

    return (<>
        <tr>
            <td>star for if they played 70% do it later</td>
            <td>#{index + 1}</td>
            <td>
                <img src={userStats.player.avatar_url} alt="pfp"></img>
                {userStats.player.username}
            </td>
            <td>{userStats.pscore}</td>
            <td>{userStats.mapsPlayed}/{userStats.maxMapsPlayed}</td>
            <td>{userStats.avgScore}</td>
            <td>{(userStats.avgAcc * 100).toFixed(2)}%</td>
            <td> 
                {userStats.bestMap.name} [{userStats.bestMap.diff}] {' '}
                {userStats.bestScore.rank + ' '} 
                {userStats.bestScore.score} 
            </td>
        </tr>
    </>)
}

export default PerformanceRow;