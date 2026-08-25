import styles from './generate-stats.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router';
import { arraysEqual } from '../../utils/generalUtils';

const GenerateStats = ({selectedMatches, maps, setStatsReady, setStats, excludedGames}) => {
    const navigate = useNavigate();

    // WIP function
    async function getStats() {
        const matchIDs = selectedMatches.map((match) => match.match.id);
        const selectedMaps = maps.filter((map) => map.selected);

        const individualPerformanceResponse = await fetch("/api/analysis/individual/performance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                maps: selectedMaps,
                matches: matchIDs,
                excluded: Array.from(excludedGames)
            })
        })

        if (!individualPerformanceResponse) {
            console.error("Failed to get stats");
            return;
        }

        const individualPerformance = await individualPerformanceResponse.json();

        // individualPerformance.forEach((person) => console.log(`${person.player.username}: ${person.pscore}, ${person.avgScore}`))
        // individualPerformance.forEach((person) => console.log(person));

        // stats[0] is individual pscore
        // stats[1] is 
        setStats([individualPerformance]);

        setStatsReady(true);
        navigate('individual');
    };

    const mapCount = maps.filter((map) => map.selected).length

    const gameCount = selectedMatches.reduce((total, match) => {
        const games = match.events.filter((event) => {
            if (!event.game || !event.game.end_time || !event.game.beatmap) {
                return false;
            } else if (excludedGames.has(event.game.id)) {
                return false;
            } else if (maps.some(map => event.game.beatmap.id == map.id && arraysEqual(event.game.mods, map.mods) && map.selected)) {
                return true;
            } else {
                return false;
            }
        }).length;
        return total + games;
    }, 0)


    return (<>
        <div className={styles.card}>
            <div className={styles.cardText}>
                <h2>Done selecting maps and matches to be analyzed?</h2>
                <h3>
                    {`${mapCount} ${mapCount == 1 ? 'map' : 'maps'}`} &#183;&nbsp;
                    {`${selectedMatches.length} ${selectedMatches.length == 1 ? 'match' : 'matches'}`} &#183;&nbsp;
                    {`${gameCount} ${gameCount == 1 ? 'game' : 'games'}`}
                </h3>
            </div>

            <button onClick={getStats}>Generate Statistics</button>
        </div>
    </>);
}

export default GenerateStats;