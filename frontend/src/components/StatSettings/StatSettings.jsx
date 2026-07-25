import styles from './stat-settings.module.css';
import MatchList from '../MatchList/MatchList';
import MapList from '../MapList/MapList';
import { useMemo } from 'react';

const StatSettings = ({selectedMatches, setSelectedMatches}) => {
    // Generates a list of unique maps + mod combos that are in selectedMatches
    const uniqueMaps = useMemo(() => {
        const beatmaps = [];

        selectedMatches.forEach((mp) => {
            mp.events
            .filter((event) => (event.detail.type == "other"))
            .forEach((map) => {

                let modStr = "";
                if (map.game.mods.length == 0) {
                    modStr = "FM"
                } else {
                    modStr = map.game.mods.reduce((str, mod, index) => {
                        if (index == 0) {
                            return str + mod;
                        } else {
                            return str + ", " + mod;
                        }
                    }, "");
                }

                const newMap = {
                    id: map.game.beatmap.id,
                    name: map.game.beatmap.beatmapset.title,
                    diff: map.game.beatmap.version,
                    mods: modStr
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

    console.log(uniqueMaps);


    return (<>
        <div className={styles.flexContainer}>
            <MapList maps={uniqueMaps}/>
            <MatchList selectedMatches={selectedMatches} setSelectedMatches={setSelectedMatches}/>
        </div>
    </>);
}

export default StatSettings;