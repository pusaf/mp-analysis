import styles from './match-list.module.css';
import MatchDisplay from './MatchDisplay/MatchDisplay';

const MatchList = ({selectedMatches, setSelectedMatches}) => {
    return (<>
        <div className={styles.card}>
            <h2>Selected Matches ({selectedMatches.length})</h2>
            <h3>These matches will be included in your analysis.</h3>
            <ul className={styles.matchList}>
                {selectedMatches.map((mp) => {
                    return <MatchDisplay key={mp.match.id} mp={mp}/>
                })}
            </ul>
        </div>
    </>);
}

export default MatchList;