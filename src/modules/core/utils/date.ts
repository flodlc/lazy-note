export const getFormattedDate = (date: string) => {
    return new Date(date).toLocaleString('fr', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
};
