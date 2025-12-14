import { Loader } from "@/shared/ui/Loader";
import styles from "./ToursPending.module.scss";

interface ToursPendingProps {
    maxRetries?: number;
    retryCount?: number;
}

export const ToursPending = ({ retryCount, maxRetries }: ToursPendingProps) => {
    const showRetryInfo = retryCount !== undefined && maxRetries !== undefined;

    return (
        <div className={styles.pendingResult}>
            <div className={styles.pending}>
                <Loader />
                <p className={styles.pendingText}>Шукаємо тури...</p>
                {showRetryInfo && retryCount! > 0 && (
                    <p className={styles.retryInfo}>
                        Спроба {retryCount + 1} з {maxRetries}
                    </p>
                )}
            </div>
        </div>
    );
};
