import { type PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchUsers } from '../../model/services/fetchUsers/fetchUsers';
import { getUsers, usersPageReducer } from '../../model/slice/usersPageSlice';
import { getUsersPageError, getUsersPageIsLoading } from '../../model/selectors/usersSelector';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { Text } from '@/shared/ui/Text';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { UsersListItem } from '../UsersListItem/UsersListItem';

interface UsersPageProps {
   className?: string;
}

const reducers: ReducerList = {
    usersPage: usersPageReducer,
};

export const UsersPage = memo((props: PropsWithChildren<UsersPageProps>) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const users = useSelector(getUsers.selectAll);
    const isLoading = useSelector(getUsersPageIsLoading);
    const error = useSelector(getUsersPageError);

    useInitialEffect(() => {
        dispatch(fetchUsers());
    });

    useDynamicModuleLoad({ reducers });

    return (
        <StickyContentLayout
            // right={<ArticlesFilters />}
            content={(
                <Page
                    data-testid="UserssPage"
                    className={className}
                >
                    <VStack gap="20" max>
                        <Text title={t('Список пользователей')} />
                        {users.map((user) => <UsersListItem key={user.id} user={user} />)}
                    </VStack>
                </Page>
            )}
        />
    );
});
