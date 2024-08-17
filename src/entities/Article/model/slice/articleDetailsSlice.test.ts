import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { ArticleDetailsSchema } from '../types/ArticleDetailsSchema';
import { Article } from '../types/article';
import { ArticleBlockType, ArticleType } from '../consts/consts';
import { articleDetailsReducers } from './articleDetailsSlice';

const data: Article = {
    id: '1',
    title: 'subtitle',
    subtitle: 'Что нового в JS за 2023-й год?',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
    views: 1022,
    createdAt: '04.09.2023',
    user: {
        id: '1',
        username: 'Grigo',
    },
    type: [ArticleType.IT],
    blocks: [{
        id: '1',
        title: 'subtitle',
        type: ArticleBlockType.TEXT,
        paragraphs: '1',
    }],
};

describe('articleDetailsSlice.test', () => {
    test('test fetch article service pending', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: false,
        };
        expect(articleDetailsReducers(
            state as ArticleDetailsSchema,
            fetchArticleById.pending,
        )).toEqual({
            isLoading: true,
            error: undefined,
        });
    });

    test('test fetch article servic service fullfilled', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: true,
        };
        expect(articleDetailsReducers(
            state as ArticleDetailsSchema,
            fetchArticleById.fulfilled(data, '1', ''),
        )).toEqual({
            isLoading: false,
            data,
        });
    });
});
