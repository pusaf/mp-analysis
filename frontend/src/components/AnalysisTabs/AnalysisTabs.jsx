import styles from './analysis-tabs.module.css';
import useState from 'react';
import { NavLink } from 'react-router';

const AnalysisTabs = ({ tab, setTab, statsReady }) => {
    return (<>
        <div className={styles.centerContainer}>
            <div className={styles.tabContainer}>
                <NavLink to="." end className={styles.tab}>MAPPOOL SELECTION</NavLink>
                <NavLink 
                    to="individual" 
                    className={`${styles.tab} ${statsReady ? "" : styles.unavailable}`}
                    onClick={(e) => {
                        if (!statsReady) {
                            e.preventDefault();
                        }
                    }}
                >INDIVIDUAL STATS</NavLink>
            </div>
        </div>
    </>)
}


export default AnalysisTabs;