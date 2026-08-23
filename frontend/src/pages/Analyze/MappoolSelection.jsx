import styles from './mappool-selection.module.css';
import MatchInput from '../../components/MatchInput/MatchInput.jsx';
import StatSettings from '../../components/StatSettings/StatSettings.jsx';
import GenerateStats from '../../components/GenerateStats/GenerateStats.jsx';
import { useOutletContext } from 'react-router';
import { useState, useEffect } from 'react';


const MappoolSelection = () => {
    const {
        selectedMatches,
        setSelectedMatches,
        maps,
        setMaps,
        setStatsReady,
        setStats, 
        excludedGames,
        setExcludedGames
    } = useOutletContext();

    const [readyToGenerate, setReadyToGenerate] = useState(false);

    

    // Check if stats are ready to be generated
    useEffect(() => {
        if (selectedMatches.length > 0 &&
            maps.filter((map) => map.selected).length > 0
        ) {
            setReadyToGenerate(true);
        } else {
            setReadyToGenerate(false);
        }
    }, [selectedMatches, maps]);

    return (<> 
        <div className={styles.flexCenter}>
            <div className={styles.container}>
                <MatchInput selectedMatches={selectedMatches} setSelectedMatches={setSelectedMatches}/>
                <StatSettings selectedMatches={selectedMatches} setSelectedMatches={setSelectedMatches} maps={maps} setMaps={setMaps} excludedGames={excludedGames} setExcludedGames={setExcludedGames}/>
                {readyToGenerate ? <GenerateStats selectedMatches={selectedMatches} maps={maps} setStatsReady={setStatsReady} setStats={setStats} />: <></>}
            </div>
        </div>
    </>)
}

export default MappoolSelection;