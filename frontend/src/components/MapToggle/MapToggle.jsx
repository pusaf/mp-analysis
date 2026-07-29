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

    // Display mods in readable manner
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

    return (<>
        <li className={styles.beatmap}> 
            <input type="checkbox" id={`mp-map-${map.id}+${modStr}`} name={index} checked={map.selected} onChange={handleCheck}></input>
            <label htmlFor={`mp-map-${map.id}+${modStr}`}>
                <span className={styles.mapName}>{map.name} [{map.diff}]</span>
                <span className={styles.mods}>+{modStr}</span>
            </label>
        </li>
    </>);
}

export default MapToggle;