import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchUsers } from '../../model/services/fetchUsers/fetchUsers';
import { getUsers, usersPageReducer } from '../../model/slice/usersPageSlice';
import { getUsersPageError, getUsersPageIsLoading } from '../../model/selectors/usersSelector';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { VStack } from '@/shared/ui/Stack';
import { UsersListItem } from '../UsersListItem/UsersListItem';
import cls from './UsersPage.module.scss';
import { UsersPageFilters } from '../UsersPageFilters/UsersPageFilters';

const reducers: ReducerList = {
    usersPage: usersPageReducer,
};

export const UsersPage = memo(() => {
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
            right={<UsersPageFilters />}
            content={(
                <VStack gap="20" max className={cls.UsersPage}>
                    {users.map((user) => <UsersListItem key={user.id} user={user} />)}
                </VStack>
            )}
        />
    );
});
