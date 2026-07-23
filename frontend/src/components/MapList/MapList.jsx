import styles from './map-list.module.css';
import MapToggle from '../MapToggle/MapToggle';

const MapList = ({ maps }) => {
    return (<>
        <div className={styles.card}>
            <h2>Found Maps ({maps.length})</h2>
            <h3>Choose which maps to be included in the analysis.</h3>
            <ul>
                {maps.map((beatmap, index) => {
                    return <MapToggle key={"toggle" + beatmap.id + "-" + beatmap.mods} map={beatmap} index={index} />
                })}
            </ul>
        </div>
    </>);
}

export default MapList;