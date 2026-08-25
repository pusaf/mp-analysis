import styles from './game-list.module.css';
import GameDisplay from './GameDisplay/GameDisplay';

import { useRef, useEffect } from 'react';


const GameList = ({ mp, excludedGames, setExcludedGames, maps}) => {
    const gameRef = useRef(null);

    useEffect(() => {
        gameRef.current?.scrollTo(0,0);
    }, [mp]);

    const games = mp?.events.filter((event) => {
        return (event.game && event.game.end_time);
    }).map((game) => game.game);

    return (<>

        <div className={styles.gameContainer}>
            <h2>Games</h2>
            <h3>View and exclude games from analysis.</h3>
            <div className={styles.gameList} ref={gameRef}>
                {!mp ?
                    ""
                    :
                    <ul>
                        {games.map(game => <GameDisplay game={game} users={mp.users} maps={maps} key={`MP${mp.match.id}GAME${game.id}`} excludedGames={excludedGames} setExcludedGames={setExcludedGames} />)}
                    </ul>
                }
            </div>
        </div>
        
    </>);
    

   
}

export default GameList;