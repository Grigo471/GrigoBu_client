import { ArticleDetailsSchema } from './ArticleDetailsSchema';
import { ArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema';

export interface ArticleDetailsPageSchema {
    article: ArticleDetailsSchema;
    comments: ArticleDetailsCommentsSchema;
}
