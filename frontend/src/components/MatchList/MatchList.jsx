import styles from './match-list.module.css';
import MatchDisplay from './MatchDisplay/MatchDisplay';
import GameList from './GameList/GameList';

import { useState, useEffect } from 'react';

const MatchList = ({selectedMatches, setSelectedMatches, excludedGames, setExcludedGames}) => {

    const [activeMatch, setActiveMatch] = useState(null);

    // TODO: implement setting active match by clicking on corresponding match

    useEffect(() => {
        if (selectedMatches.length == 0) {
            setActiveMatch(null);
        } else if (selectedMatches.length >= 1 && !activeMatch) {
            setActiveMatch(selectedMatches[0]);
        }
    }, [selectedMatches]);

    // If the match an excluded game was from is no longer selected, remove it
    useEffect(() => {
        setExcludedGames(prev => {
            const validGameIds = new Set();

            selectedMatches.forEach(match => {
                match.events.forEach(event => {
                    if (event.game?.id != null) {
                        validGameIds.add(event.game.id);
                    }
                });
            });

            return new Set(
                [...prev].filter(gameId => validGameIds.has(gameId))
            );
        });
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
                <GameList mp={activeMatch} excludedGames={excludedGames} setExcludedGames={setExcludedGames}/>
            </div>
        </div>
    </>);
}

export default MatchList;