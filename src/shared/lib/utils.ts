export const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
};

export const formatPrice = (amount: number): string => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
