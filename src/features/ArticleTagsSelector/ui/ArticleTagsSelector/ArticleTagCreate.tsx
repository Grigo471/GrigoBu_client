import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ArticleTagCreateProps {
    onCreate: (tag: string) => void;
}

export const ArticleTagCreate = (props: ArticleTagCreateProps) => {
    const { onCreate } = props;
    const { t } = useTranslation('article-edit');

    const [createTag, setCreateTag] = useState('');

    const onClickHandler = () => {
        if (createTag.length > 0) {
            onCreate(createTag);
            setCreateTag('');
        }
    };

    return (
        <>
            <Text text={t('Choose tags')} size="m" bold />
            <HStack gap="4">
                <Input
                    value={createTag}
                    onChange={(value) => setCreateTag(value)}
                    placeholder={t('or create your own tags')}
                    size="s"
                />
                <Button square onClick={onClickHandler}>+</Button>
            </HStack>
        </>
    );
};
