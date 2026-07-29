import styles from './analyze.module.css';
import MatchInput from '../../components/MatchInput/MatchInput.jsx';
import StatSettings from '../../components/StatSettings/StatSettings.jsx';
import { useState, useMemo, useEffect } from 'react';

const Analyze = () => {
    const [tab, setTab] = useState("mapInput");
    const [selectedMatches, setSelectedMatches] = useState([]);
    const [maps, setMaps] = useState([]);

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

            console.log(updated);

            return updated;
        });
    }, [uniqueMaps]);

    return (<>
        <div className={styles.analyzePage}>
            <div>analysis page</div>
            <div className={styles.flexCenter}>
                {tab === 'mapInput' && <MatchInput selectedMatches={selectedMatches} setSelectedMatches={setSelectedMatches}/>}
                {tab === 'mapInput' && <StatSettings selectedMatches={selectedMatches} setSelectedMatches={setSelectedMatches} maps={maps} setMaps={setMaps}/>}
            </div>
        </div>
    </>)
}

export default Analyze;