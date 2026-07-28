import styles from './map-list.module.css';
import MapToggle from '../MapToggle/MapToggle';

const MapList = ({ maps, setMaps }) => {
    return (<>
        <div className={styles.card}>
            <h2>Choose Mappool ({maps.length})</h2>
            <h3>Include or exclude maps from your analysis.</h3>
            <ul>
                {maps.map((beatmap, index) => {
                    return <MapToggle key={"toggle" + beatmap.id + "-" + beatmap.mods} map={beatmap} index={index} setMaps={setMaps}/>
                })}
            </ul>
        </div>
    </>);
}

export default MapList;