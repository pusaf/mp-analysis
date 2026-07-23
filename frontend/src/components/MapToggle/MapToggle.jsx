import styles from './map-toggle.module.css';

const MapToggle = ({ map, index }) => {
    return (<>
        <li className={styles.beatmap}> 
            <input type="checkbox" id={`mp-map-${map.id}+${map.mods}`} name={index} defaultChecked></input>
            <label htmlFor={`mp-map-${map.id}+${map.mods}`}>
                <span className={styles.mapName}>{map.name} [{map.diff}]</span>
                <span className={styles.mods}>+{map.mods}</span>
            </label>
        </li>
    </>);
}

export default MapToggle;