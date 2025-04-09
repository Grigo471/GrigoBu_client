import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/ui/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { getRouteArticleEdit } from '@/shared/const/router';
import { getArticleDetailsData } from '../../model/selectors/articleSelector';

export const AdditionalInfoContainer = memo(() => {
    const article = useSelector(getArticleDetailsData);

    const navigate = useNavigate();

    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article?.id));
        }
    }, [navigate, article]);

    if (!article) return null;

    return (
        <Card padding="24">
            <ArticleAdditionalInfo
                onEdit={onEditArticle}
                author={article.user}
            />
        </Card>
    );
});
