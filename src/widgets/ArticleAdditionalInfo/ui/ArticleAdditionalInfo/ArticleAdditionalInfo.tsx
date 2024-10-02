import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { srcWithApi } from '@/shared/lib/url/srcWithApi/srcWithApi';

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

    return (
        <VStack gap="32" className={className}>
            <HStack gap="8">
                <Avatar src={srcWithApi(author.avatar)} size={32} />
                <Text text={author.username} bold />
                <Text text={createdAt} />
            </HStack>
            <Button onClick={onEdit}>{t('Редактировать')}</Button>
        </VStack>
    );
});
