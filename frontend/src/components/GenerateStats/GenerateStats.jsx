import styles from './generate-stats.module.css';
import Button from '../Button/Button';

const GenerateStats = ({selectedMatches, maps, setStatsReady}) => {


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
                matches: matchIDs
            })
        })

        if (!individualPerformanceResponse) {
            console.error("Failed to get stats");
            return;
        }

        const individualPerformance = await individualPerformanceResponse.json();

        setStatsReady(true);
    };

    return (<>
        <div className={styles.card}>
            <div className={styles.cardText}>
                <h2>Done selecting maps and matches to be analyzed?</h2>
                <h3>We'll calculate stats based on your selections.</h3>
            </div>

            <button onClick={getStats}>Generate Statistics</button>
        </div>
    </>);
}

export default GenerateStats;