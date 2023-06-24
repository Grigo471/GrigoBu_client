import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import type { PropsWithChildren } from 'react';
import { ReducerList, useDynamicModuleLoad } from 'shared/lib/hooks/useDynamicModuleLoad';
import { profileReducer } from 'entities/Profile';

const reducers: ReducerList = {
    profile: profileReducer,
};

interface ProfilePageProps {
 className?: string;
}

function ProfilePage(props: PropsWithChildren<ProfilePageProps>) {
    const { className } = props;

    useDynamicModuleLoad({ reducers });

    const { t } = useTranslation();
    return (
        <div className={classNames('', {}, [className])}>
            {t('PROFILE PAGE')}
        </div>
    );
}

export default ProfilePage;
