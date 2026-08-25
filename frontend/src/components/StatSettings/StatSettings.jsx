import styles from './stat-settings.module.css';
import MatchList from '../MatchList/MatchList';
import MapList from '../MapList/MapList';

const StatSettings = ({selectedMatches, setSelectedMatches, maps, setMaps, excludedGames, setExcludedGames}) => {
    return (<>
        <div className={styles.flexContainer}>
            <MapList maps={maps} setMaps={setMaps}/>
            <MatchList selectedMatches={selectedMatches} setSelectedMatches={setSelectedMatches} excludedGames={excludedGames} setExcludedGames={setExcludedGames} maps={maps}/>
        </div>
    </>);
}

export default StatSettings;