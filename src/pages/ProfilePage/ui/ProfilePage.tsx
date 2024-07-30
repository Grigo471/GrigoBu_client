import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { EditableProfileCard } from '@/features/EditableProfileCard';

interface ProfilePageProps {
 className?: string;
}

function ProfilePage(props: ProfilePageProps) {
    const { className } = props;
    const { id } = useParams<string>();

    return (
        <Page data-testid="ProfilePage" className={classNames('', {}, [className])}>
            <VStack max gap="16">
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
}

export default ProfilePage;
