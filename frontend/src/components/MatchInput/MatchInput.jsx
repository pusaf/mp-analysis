import styles from './match-input.module.css';
import {useState} from "react";
import { parseMatchId } from '../../utils/matchUtils';
import Button from '../Button/Button';

const MatchInput = ({selectedMatches, setSelectedMatches}) => {
    const [matchInputs, setMatchInputs] = useState("");

    async function submitMatches(e) {
        e.preventDefault();

        // Create list of ids and filter out all non mp IDs
        const ids = matchInputs
            .split("\n")
            .map(line => parseMatchId(line))
            .filter(Boolean);
        const unique_ids = [... new Set(ids)].map((id) => String(id));    
        
        // Get matches from backend
        const response = await fetch("/api/matches/import", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                matches: unique_ids
            })
        });

        // Reset input box and check for error
        setMatchInputs("");
        if (!response.ok) {
            console.error("Failed to import matches");
            return;
        } 

        // Set new selected matches, ignoring any that were already selected
        const data = await response.json();
        const newMatches = data.filter(
            (newMatch) => !selectedMatches.some(
                (match) => match.match.id === newMatch.match.id
            )
        );
        setSelectedMatches([...selectedMatches, ...newMatches]);
    }

    return (<>
        
        <form className={styles.card} onSubmit={submitMatches} noValidate>
            <div>
                <label htmlFor="matches">Add mp links or ids here, one per line</label>
            </div>
            <h3>You can paste full links or just the match ID.</h3>
            <textarea 
                id="matches" name="matches" type="url" placeholder="osu.ppy.sh/mp/1234 or 1234" required 
                value={matchInputs}
                onChange={(e) => setMatchInputs(e.target.value)}
            />
            <Button enabled={matchInputs.trim()} text="Get Matches"/>
        </form>
        
    </>)
}




export default MatchInput;