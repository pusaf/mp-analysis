import styles from './map-toggle.module.css';

const MapToggle = ({ map, index, setMaps }) => {

    // Add or remove map from mappool when checked/unchecked
    function handleCheck(e) {
        setMaps(prev =>
            prev.map(oldMap =>
                oldMap.id === map.id &&
                oldMap.mods === map.mods
                    ? { ...oldMap, selected: e.target.checked }
                    : oldMap
            )
        );
    }


    return (<>
        <li className={styles.beatmap}> 
            <input type="checkbox" id={`mp-map-${map.id}+${map.mods}`} name={index} checked={map.selected} onChange={handleCheck}></input>
            <label htmlFor={`mp-map-${map.id}+${map.mods}`}>
                <span className={styles.mapName}>{map.name} [{map.diff}]</span>
                <span className={styles.mods}>+{map.mods}</span>
            </label>
        </li>
    </>);
}

export default MapToggle;