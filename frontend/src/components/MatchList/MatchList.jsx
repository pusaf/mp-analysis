import styles from './match-list.module.css';
import MatchDisplay from './MatchDisplay/MatchDisplay';
import GameList from './GameList/GameList';

import { useState, useEffect } from 'react';

const MatchList = ({selectedMatches, setSelectedMatches}) => {

    const [activeMatch, setActiveMatch] = useState(null);

    useEffect(() => {
        // TEmporary jsut assigning first in selected matches
        if (selectedMatches.length > 0) {
            setActiveMatch(selectedMatches[0]);
        }
        console.log('heyyy');
    }, [selectedMatches]);

    return (<>
        <div className={styles.card}>
            <div className={styles.matches}>
                <h2>Selected Matches ({selectedMatches.length})</h2>
                <h3>Preview added matches here. </h3>
                <ul className={styles.matchList}>
                    {selectedMatches.map((mp) => {
                        return <MatchDisplay key={mp.match.id} mp={mp} setSelectedMatches={setSelectedMatches}/>
                    })}
                </ul>
            </div>
            <div className={styles.games}>
                <GameList mp={activeMatch}/>
            </div>
        </div>
    </>);
}

export default MatchList;