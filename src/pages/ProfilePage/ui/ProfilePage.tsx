import { classNames } from 'shared/lib/classNames/classNames';
import { type PropsWithChildren } from 'react';
import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { EditableProfileCard } from 'features/EditableProfileCard';
import { useParams } from 'react-router-dom';

interface ProfilePageProps {
 className?: string;
}

function ProfilePage(props: PropsWithChildren<ProfilePageProps>) {
    const { className } = props;
    const { id } = useParams<string>();

    return (
        <Page className={classNames('', {}, [className])}>
            <VStack max gap="16">
                <EditableProfileCard id={id} />
            </VStack>

        </Page>
    );
}

export default ProfilePage;
