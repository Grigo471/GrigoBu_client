import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ArticlesList } from '@/widgets/ArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articlesPageActions } from '../../model/slice/ArticlesPageSlice';
import {
    getArticlesPageLimit, getArticlesPageNum,
    getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort,
} from '../../model/selectors/articlesPageSelectors';
import { useGetArticles } from '@/entities/Article';

export const ArticlesPageList = memo(() => {
    const dispatch = useAppDispatch();

    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);
    const page = useSelector(getArticlesPageNum);
    const limit = useSelector(getArticlesPageLimit);

    const {
        data, isLoading, error,
    } = useGetArticles({
        order, sort, search, page, limit,
    });

    const onLoadNextPart = () => {
        dispatch(articlesPageActions.setPage(page + 1));
    };

    return (
        <ArticlesList
            articles={data}
            isLoading={isLoading}
            onLoadNextPart={onLoadNextPart}
        />
    );
});
