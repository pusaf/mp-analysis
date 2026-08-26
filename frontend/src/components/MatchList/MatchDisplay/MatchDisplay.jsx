import styles from './match-display.module.css';
import GameDisplay from '../GameList/GameDisplay/GameDisplay';
import { useState } from 'react';

// TODO
// Implement dropdown for each match to preview the scores

const MatchDisplay = ({ mp, setSelectedMatches, activeMatch, setActiveMatch }) => {
    // Removes a match from selected matches
    function removeMatch() {
        setSelectedMatches(prev => prev.filter(match => match.match.id !== mp.match.id));
    }



    const games = mp.events.filter((event) => {
        return (event.game && event.game.end_time);
    }).map((game) => game.game);
    const mapCount = games.length;


    return (<>
        <li className={`${styles.mp} ${activeMatch?.match.id == mp.match.id ? styles.active : ''}`}>
            <button 
                className={styles.name}
                onClick={() => setActiveMatch(mp)}
            >
                {mp.match.name}
            </button>
            <span className={styles.mpOptions}>
                <span>{mapCount} maps</span>
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