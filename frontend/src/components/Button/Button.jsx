import styles from './button.module.css';

const Button = ( {enabled = true, size = 'normal', style = 'primary', text = "Click me!"}) => {


    return (
        <button disabled={!enabled} className={[
            styles[style],
            styles[size],
            styles.btn
        ].join(" ")}>
            {text}
        </button>
    )
}


export default Button;