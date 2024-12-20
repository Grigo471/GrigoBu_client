export const formatDateToLocal = (
    dateStr: string,
    language: string = 'ru',
    withTime: boolean = true,
) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: withTime ? 'numeric' : undefined,
        minute: withTime ? 'numeric' : undefined,
    };
    const formatter = new Intl.DateTimeFormat(language === 'ru' ? 'ru' : 'en-US', options);
    return formatter.format(date);
};
