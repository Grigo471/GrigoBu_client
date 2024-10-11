export enum ValidateArticleError {
    EMPTY_TITLE = 'EMPTY MAIN',
    INCORRECT_ARTICLE_TYPE = 'INCORRECT ARTICLE TYPE',
    EMPTY_BLOCKS = 'EMPTY BLOCKS',
    NO_BLOCKS = 'NO BLOCKS',
    NO_TAGS = 'NO TAGS',
    NO_DATA = 'NO DATA',
    SERVER_ERROR = 'SERVER ERROR',
    LONG_TEXT = 'LONG TEXT',
}

export const validateErrorsTranslations = {
    [ValidateArticleError.SERVER_ERROR]: 'Серверная ошибка при сохранении',
    [ValidateArticleError.EMPTY_TITLE]: 'Вставьте заголовок',
    [ValidateArticleError.NO_BLOCKS]: 'Вставьте хотя бы один блок',
    [ValidateArticleError.NO_TAGS]: 'Выберите от 1 до 10 тегов',
    [ValidateArticleError.INCORRECT_ARTICLE_TYPE]: 'Укажите тип статьи',
    [ValidateArticleError.EMPTY_BLOCKS]: 'Блоки не должны быть пустыми',
    [ValidateArticleError.NO_DATA]: 'Данные не указаны',
    [ValidateArticleError.LONG_TEXT]: 'Не более 10000 символов в блоке',
};
