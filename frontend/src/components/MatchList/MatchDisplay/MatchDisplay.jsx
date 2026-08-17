import styles from './match-display.module.css';
import { useState } from 'react';

// TODO
// Implement dropdown for each match to preview the scores

const MatchDisplay = ({ mp, setSelectedMatches }) => {
    const [expanded, setExpanded] = useState(false);

    const mapCount = mp.events.filter((event) => {
        return (event.game && event.game.end_time);
    }).length;

    function removeMatch() {
        setSelectedMatches(prev => prev.filter(match => match.match.id !== mp.match.id));
    }

    return (<>
        <li className={styles.mp}>
            <span>{mp.match.name}</span>
            <span className={styles.mpDropdown}>
                <span>{mapCount} maps</span>
                <button
                    className={expanded ? styles.expanded : ""}
                    onClick={() => setExpanded(!expanded)}
                >
                    <span className={styles.dropdown} ></span>
                </button>
                <button 
                    className={styles.removeButton}
                    onClick={removeMatch}
                >
                    &#10006;
                </button>
            </span>
        </li>
    </>);
}

export default MatchDisplay;