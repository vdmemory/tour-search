import styles from "./ToursError.module.scss";

interface ToursErrorProps {
    error?: string;
}

const DEFAULT_ERROR_MESSAGE =
    "Вибачте, сталася помилка під час пошуку турів. Будь ласка, спробуйте пізніше.";

export const ToursError = ({ error }: ToursErrorProps) => {
    return (
        <div className={styles.errorResult}>
            <div className={styles.error}>
                <p>{error || DEFAULT_ERROR_MESSAGE}</p>
            </div>
        </div>
    );
};
