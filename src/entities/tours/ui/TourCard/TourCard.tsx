import { Card } from "@/shared/ui/Card/Card";
import Link from "next/link";
import Image from "next/image";
import styles from "./TourCard.module.scss";
import { formatDate, formatPrice } from "@/shared/lib/utils";
import { TourWithHotel } from "../../model/types";

interface TourCardProps {
    tour: TourWithHotel;
}

export const TourCard = ({ tour }: TourCardProps) => {
    const { hotel } = tour;

    return (
        <Card>
            <div className={styles.imageContainer}>
                <Image src={hotel.img} alt={hotel.name} className={styles.image} fill />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.hotelName}>{hotel.name}</h3>
                    <p className={styles.location}>
                        {hotel.countryName}, {hotel.cityName}
                    </p>
                </div>
                <div className={styles.info}>
                    <p className={styles.dates}>
                        {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
                    </p>
                    <div className={styles.price}>
                        {formatPrice(tour.amount)}
                        <span className={styles.currency}>USD</span>
                    </div>
                </div>
                <div className={styles.footer}>
                    <Link href="/" className={styles.link}>
                        Відкрити ціну →
                    </Link>
                </div>
            </div>
        </Card>
    );
};
