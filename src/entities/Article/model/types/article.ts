import { User } from '@/entities/User';
import { ArticleBlockType } from '../consts/consts';

export interface ArticleBlockBase {
    id: string;
    type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
    type: 'code';
    code: string;
    title?: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: 'image';
    src: string;
    title?: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type: 'text';
    title?: string;
    paragraphs: string;
}

export type ArticleBlock = ArticleTextBlock | ArticleCodeBlock | ArticleImageBlock;

export type Rate = -1 | null | 1;

export interface Article {
    id: string;
    user: User;
    title: string;
    tags: string[];
    rating: number;
    createdAt: string;
    blocks: ArticleBlock[];
    myRate?: Rate;
    commentsCount?: number;
}

export interface RateArticleResult {
    myRate: Rate;
    articleId: string;
    rating: number;
}
