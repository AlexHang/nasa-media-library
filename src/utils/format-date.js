export const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    // maybe could also use DayJS if this needs other features
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);

};