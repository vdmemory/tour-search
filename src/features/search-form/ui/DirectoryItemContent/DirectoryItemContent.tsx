import styles from "./DirectoryItemContent.module.scss";

interface DirectoryItemContentProps {
    icon: string;
    name: string;
    details: string;
}

export const DirectoryContent = ({ icon, name, details }: DirectoryItemContentProps) => {
    return (
        <>
            <div className={styles.itemIcon}>{icon}</div>
            <div className={styles.itemContent}>
                <div className={styles.itemName}>{name}</div>
                <div className={styles.itemDetails}>{details}</div>
            </div>
        </>
    );
};
