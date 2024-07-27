/* eslint-disable max-len */
import { memo, useCallback, type PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Page } from '@/widgets/Page';
import cls from './ArticlesPage.module.scss';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { ArticlesPageFilter } from '../ArticlesPageFilter/ArticlesPageFilter';
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList';
import { ArticlesPageGreeting } from '@/features/ArticlesPageGreeting';

interface ArticlesPageProps {
   className?: string;
}

const ArticlesPage = (props: PropsWithChildren<ArticlesPageProps>) => {
    const { className } = props;
    const dispatch = useAppDispatch();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return (
        <Page
            data-testid="ArticlesPage"
            onScrollEnd={onLoadNextPart}
            className={classNames(cls.ArticlesPage, {}, [className])}
        >
            <ArticlesPageFilter />
            <ArticlesInfiniteList className={cls.list} />
            <ArticlesPageGreeting />
        </Page>
    );
};

export default memo(ArticlesPage);
