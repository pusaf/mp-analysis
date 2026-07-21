import styles from './analyze.module.css';
import MatchInput from '../../components/MatchInput/MatchInput.jsx';
import StatSettings from '../../components/MatchesInfo/StatSettings.jsx';
import { useState } from 'react';

const Analyze = () => {
    const [tab, setTab] = useState("mapInput");
    const [selectedMatches, setSelectedMatches] = useState([]);

    return (<>
        <div>analysis page</div>
        <div className={styles.flexCenter}>
            {tab === 'mapInput' && <MatchInput selectedMatches={selectedMatches} setSelectedMatches={setSelectedMatches}/>}
            {tab === 'mapInput' && <StatSettings selectedMatches={selectedMatches} setSelectedMatches={setSelectedMatches}/>}
        </div>
    </>)
}

export default Analyze;