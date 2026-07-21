import styles from './map-list.module.css';
import MapToggle from '../MapToggle/MapToggle';

const MapList = ({ maps }) => {
    return (<>
        <ul>
            {maps.map((beatmap, index) => {
                return <MapToggle key={"toggle" + beatmap.id + "-" + beatmap.mods} map={beatmap} index={index} />
            })}
        </ul>
    </>);
}

export default MapList;