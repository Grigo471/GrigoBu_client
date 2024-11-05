import {
    memo, useEffect,
} from 'react';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articlesPageActions, articlesPageReducer } from '../../model/slice/ArticlesPageSlice';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticlesPageList } from '../ArticlesPageList/ArticlesPageList';
import { ARTICLES_PAGE_CACHE_LIFETIME } from '@/shared/const/articlesApi';
import { ArticlesPageLayout } from '@/widgets/ArticlesPageLayout';

interface ArticlesPageProps {
   className?: string;
}

const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

let timer: NodeJS.Timeout;

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();

    // const scrollHandler = useThrottle(() => {
    //     sessionStorage.setItem('ArticlesPage scrollPosition', window.scrollY.toString());
    // }, 100);

    // useEffect(() => {
    //     const scrollPosition = Number(sessionStorage.getItem('ArticlesPage scrollPosition')) || 0;
    //     window.addEventListener('scroll', scrollHandler);
    //     console.log(scrollPosition);
    //     setTimeout(() => window.scrollTo({ top: scrollPosition }), 10);

    //     return () => {
    //         window.removeEventListener('scroll', scrollHandler);
    //     };
    // }, []);

    useEffect(() => {
        if (timer) clearTimeout(timer);

        return () => {
            timer = setTimeout(() => {
                dispatch(articlesPageActions.setPage(1));
            }, ARTICLES_PAGE_CACHE_LIFETIME * 1000);
        };
    });

    useDynamicModuleLoad({ reducers, removeAfterUnmount: false });

    return (
        <ArticlesPageLayout
            list={<ArticlesPageList />}
            right={<ArticlesPageFilters />}
        />
    );
};

export default memo(ArticlesPage);
