import styles from './individual.module.css';
import PerformanceLeaderboard from '../../components/PerformanceLeaderboard/PerformanceLeaderboard';
import { useOutletContext } from 'react-router';

const Individual = () => {
    const {
        selectedMatches,
        maps,
        stats
    } = useOutletContext();

    return (<>
        <PerformanceLeaderboard stats={stats[0]}/>
    </>)
};


export default Individual;