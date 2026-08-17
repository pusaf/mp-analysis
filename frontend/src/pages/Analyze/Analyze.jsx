import styles from './analyze.module.css';
import AnalysisTabs from '../../components/AnalysisTabs/AnalysisTabs';

import { useState, useMemo, useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router';

const Analyze = () => {
    const [tab, setTab] = useState("mappoolSelection");
    const [selectedMatches, setSelectedMatches] = useState([]);
    const [maps, setMaps] = useState([]);
    const [statsReady, setStatsReady] = useState(false);
    const [stats, setStats] = useState([]);


    // Generates array of unique map + mod combos every time selectedMatches is updated
    const uniqueMaps = useMemo(() => {
        const beatmaps = [];

        selectedMatches.forEach((mp) => {
            mp.events
            .filter((event) => (event.detail.type == "other"))
            .forEach((map) => {

                const newMap = {
                    id: map.game.beatmap.id,
                    name: map.game.beatmap.beatmapset.title,
                    diff: map.game.beatmap.version,
                    mods: map.game.mods
                }

                const exists = beatmaps.some( (map) =>
                    map.id === newMap.id &&
                    JSON.stringify(map.mods) === JSON.stringify(newMap.mods)
                );

                if (!exists) {
                    beatmaps.push(newMap);
                }
            });
        });

        return beatmaps;
    }, [selectedMatches]);

    // Update maps based off of uniqueMaps
    useEffect(() => {
        setMaps(prev => {
            const updated = [...prev];

            // Add maps that aren't already in the map list
            uniqueMaps.forEach(newMap => {
                const exists = updated.some(
                    map =>
                        map.id === newMap.id &&
                        map.mods === newMap.mods
                );

                if (!exists) {
                    updated.push({
                        ...newMap,
                        selected: true
                    });
                }
            });

            // Delete maps that are no longer in any selected match
            return updated.filter(currentMap => {
                const exists = uniqueMaps.some(
                    map =>
                        map.id === currentMap.id &&
                        map.mods === currentMap.mods
                );

                return exists;
            })
        });
    }, [uniqueMaps]);

    // If stats aren't ready, forcefully navigate back to mappool selection
    if (!statsReady && useLocation().pathname !== "/analyze") {
        return <Navigate to="/analyze" replace />;
    }

    return (<>
        <div className={styles.analyzePage}>
            <AnalysisTabs tab={tab} setTab={setTab} statsReady={statsReady} />
            <Outlet 
                context={{
                    selectedMatches,
                    setSelectedMatches,
                    maps,
                    setMaps,
                    setStatsReady,
                    stats,
                    setStats
                }}
            />
        </div>
    </>)
}

export default Analyze;