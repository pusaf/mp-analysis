import styles from './mappool-selection.module.css';
import MatchInput from '../../components/MatchInput/MatchInput.jsx';
import StatSettings from '../../components/StatSettings/StatSettings.jsx';
import { useOutletContext } from 'react-router';

const MappoolSelection = () => {
    const {
        selectedMatches,
        setSelectedMatches,
        maps,
        setMaps,
        setStatsReady
    } = useOutletContext();


    return (<>
        <div className={styles.flexCenter}>
            <MatchInput selectedMatches={selectedMatches} setSelectedMatches={setSelectedMatches}/>
            <StatSettings selectedMatches={selectedMatches} setSelectedMatches={setSelectedMatches} maps={maps} setMaps={setMaps}/>
        </div>
    </>)
}

export default MappoolSelection;