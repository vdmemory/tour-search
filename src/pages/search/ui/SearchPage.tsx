import { Header } from "@/widgets/header";
import styles from "./SearchPage.module.scss";
import { SearchPanel } from "@/widgets/search-panel/";

export const SearchPage = () => {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <SearchPanel />
            </main>
        </div>
    );
};
