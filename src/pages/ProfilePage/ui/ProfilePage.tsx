import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useEffect, type PropsWithChildren } from 'react';
import { ReducerList, useDynamicModuleLoad } from 'shared/lib/hooks/useDynamicModuleLoad';
import { ProfileCard, fetchProfileData, profileReducer } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

const reducers: ReducerList = {
    profile: profileReducer,
};

interface ProfilePageProps {
 className?: string;
}

function ProfilePage(props: PropsWithChildren<ProfilePageProps>) {
    const { className } = props;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    useDynamicModuleLoad({ reducers });

    const { t } = useTranslation();
    return (
        <div className={classNames('', {}, [className])}>
            <ProfileCard />
        </div>
    );
}

export default ProfilePage;
