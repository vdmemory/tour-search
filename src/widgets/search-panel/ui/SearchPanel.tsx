import { SearchForm } from "@/features/search-form";
import { SearchResult } from "@/features/search-result";

export const SearchPanel = () => {
    return (
        <div>
            <SearchForm />
            <SearchResult />
        </div>
    );
};
