import styles from './map-toggle.module.css';

const MapToggle = ({ map, index }) => {
    return (<>
        <li className={styles.beatmap}> 
            <input type="checkbox" id={`mp-map-${map.id}+${map.mods}`} name={index} defaultChecked></input>
            <label htmlFor={`mp-map-${map.id}+${map.mods}`}>
                {map.name} [{map.diff}] +{map.mods}
            </label>
        </li>
    </>);
}

export default MapToggle;