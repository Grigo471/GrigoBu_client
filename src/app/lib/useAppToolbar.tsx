import { ReactElement } from 'react';
import { AppRoutes } from '@/shared/const/router';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';
import { ScrollToTopButton } from '@/features/ScrollToTopButton';

export function useAppToolbar() {
    const currentRoute = useRouteChange();

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToTopButton />,
        [AppRoutes.SUBSCRIPTIONS]: <ScrollToTopButton />,
        [AppRoutes.PROFILE]: <ScrollToTopButton />,
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToTopButton />,
    };

    return toolbarByAppRoute[currentRoute];
}
