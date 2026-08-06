import styles from './navbar.module.css';
import { Link } from 'react-router';

const Navbar = () => {
    return (
    <div className={styles.navContainer}>
        <nav className={styles.navbar}>
            <div className={styles.flexContainer}>
                <h1>TEMPORARY NAME</h1>
            </div>
            <ul className={styles.navbuttons}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="analyze">Analyze Matches</Link></li>
            </ul>
        </nav>
    </div>
    );
};

export default Navbar;