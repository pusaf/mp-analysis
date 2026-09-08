import styles from './home.module.css';
import { Navigate } from 'react-router';

// WIP - Temporarily just navigates to the analysis page

const Home = () => {
    return (
        <Navigate to="/analyze" replace/>
    )
}

export default Home;