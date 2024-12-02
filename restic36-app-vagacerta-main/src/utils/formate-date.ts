export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Data indisponível';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};
