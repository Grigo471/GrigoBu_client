/**
 * Форматирует дату с учетом языка и местного времени
 * @param dateStr - дата, которую хотим форматировать
 * @param language - язык, в формате которого будет полученная дата
 * @param withTime - включать ли время в итоговую дату
 * @returns {string} возвращает отформатированную дату
 */

export const formatDateToLocal = (
    dateStr?: string,
    language: string = 'ru',
    withTime: boolean = true,
) => {
    if (!dateStr) return '';
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
