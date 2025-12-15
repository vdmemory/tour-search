import { TourWithHotel } from "../../model/types";
import { TourCard } from "../TourCard/TourCard";
import styles from "./ToursList.module.scss";

interface ToursListProps {
    tours: TourWithHotel[];
}

export const ToursList = ({ tours }: ToursListProps) => {
    return (
        <>
            <div className={styles.listResult}>
                <div className={styles.count}>Знайдено турів: {tours.length}</div>
                <div className={styles.grid}>
                    {tours.map((tour) => (
                        <TourCard key={tour.id} tour={tour} />
                    ))}
                </div>
            </div>
        </>
    );
};
