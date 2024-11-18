import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData, User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { srcWithApi } from '@/shared/lib/url/srcWithApi/srcWithApi';
import { SubscribeToUserButton } from '@/features/SubscribeToUserButton';

interface ArticleAdditionalInfoProps {
   className?: string;
   author: User;
   createdAt: string;
   onEdit: () => void;
}

export const ArticleAdditionalInfo = memo((props: ArticleAdditionalInfoProps) => {
    const {
        className, author, createdAt, onEdit,
    } = props;
    const { t } = useTranslation();

    const authData = useSelector(getUserAuthData);

    const date = createdAt.split('T')[0];

    const canEdit = authData?.id === author.id || authData?.role === 'admin';

    return (
        <VStack gap="16" className={className}>
            <HStack gap="8">
                <Avatar src={srcWithApi(author.avatar)} size={32} />
                <Text text={author.username} bold />
            </HStack>
            <Text text={date} />
            <SubscribeToUserButton userId={author.id} />
            {canEdit && <Button onClick={onEdit}>{t('Редактировать')}</Button>}
        </VStack>
    );
});
