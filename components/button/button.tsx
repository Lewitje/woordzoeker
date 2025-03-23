import styles from './button.module.css'

type ButtonProps = {
    onClick: () => void;
    label: string;
}

export default function Button ({ onClick, label }: ButtonProps) {
    return (
        <button onClick={onClick} type="button" className={styles.wrapper}>
            { label }
        </button>
    )
}