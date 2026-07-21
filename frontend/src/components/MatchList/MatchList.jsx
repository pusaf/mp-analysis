import styles from './match-list.module.css';
import MatchDisplay from '../MatchDisplay/MatchDisplay';

const MatchList = ({selectedMatches, setSelectedMatches}) => {
    return (<>
        <ul>
            {selectedMatches.map((mp) => {
                return <MatchDisplay key={mp.match.id} mp={mp}/>
            })}
        </ul>
    </>);
}

export default MatchList;