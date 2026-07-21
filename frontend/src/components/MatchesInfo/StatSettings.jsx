import styles from './stat-settings.module.css';
import MatchList from '../MatchList/MatchList';
import MapList from '../MapList/MapList';
import { useMemo } from 'react';

const StatSettings = ({selectedMatches, setSelectedMatches}) => {
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


    return (<>
        <div className={styles.flexContainer}>
            <MapList />
            <MatchList selectedMatches={selectedMatches} setSelectedMatches={setSelectedMatches}/>
        </div>
    </>);
}

export default StatSettings;