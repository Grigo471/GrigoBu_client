export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';

export { renderArticleBlock } from './ui/ArticleDetails/rednerArticleBlock';

export type {
    Article, ArticleBlock, ArticleTextBlock,
    ArticleCodeBlock, ArticleImageBlock,
    Rate, RateArticleResult,
} from './model/types/article';

export type {
    ArticleSortField, ArticleBlockType,
} from './model/consts/consts';

export { fetchArticleById } from './model/services/fetchArticleById/fetchArticleById';

export { likeArticle } from './model/services/likeArticle/likeArticle';

export { dislikeArticle } from './model/services/dislikeArticle/dislikeArticle';
