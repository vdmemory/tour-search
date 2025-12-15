import styles from "./ToursEmpty.module.scss";

interface ToursEmptyProps {
    message?: string;
}

const DEFAULT_MESSAGE = "За вашим запитом турів не знайдено";

export const ToursEmpty = ({ message }: ToursEmptyProps) => {
    return (
        <div className={styles.emptyResult}>
            <div className={styles.empty}>
                <div className={styles.emptyIcon}>🔍</div>
                <p className={styles.emptyText}>{message || DEFAULT_MESSAGE}</p>
            </div>
        </div>
    );
};
