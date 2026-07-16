import { Link } from "react-router";
import styles from './error-page.module.css';

const ErrorPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.title}>This is a temporary error page before i figure out what style to make this site in</div>
      <Link to="/">
        go back to homepage by clicking here :3c
      </Link>
    </div>
  );
};

export default ErrorPage;
