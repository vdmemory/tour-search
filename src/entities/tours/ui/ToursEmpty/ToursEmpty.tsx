import styles from "./ToursEmpty.module.scss";

export const ToursEmpty = () => {
    return (
        <div className={styles.emptyResult}>
            <div className={styles.empty}>
                <div className={styles.emptyIcon}>🔍</div>
                <p className={styles.emptyText}>За вашим запитом турів не знайдено</p>
            </div>
        </div>
    );
};
