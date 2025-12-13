import styles from "./Header.module.scss";

export const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Пошук Турів</h1>
            <p className={styles.subtitle}>Знайдіть ідеальну подорож за найкращою ціною</p>
        </header>
    );
};
