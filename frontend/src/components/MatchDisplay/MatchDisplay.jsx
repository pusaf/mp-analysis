import styles from './match-display.module.css';


// TODO
// Implement dropdown for each match to preview the scores

const MatchDisplay = ({ mp }) => {
    return (<>
        <li className={styles.mp}>
            {mp.match.name}
        </li>
    </>);
}

export default MatchDisplay;