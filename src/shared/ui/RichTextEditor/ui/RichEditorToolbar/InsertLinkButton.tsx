import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../Button';
import { Input } from '../../../Input';
import { HStack } from '../../../Stack';
import LinkSvg from '@/shared/assets/icons/link.svg';
import { Icon } from '../../../Icon';

export const InsertLinkButton = memo(({ selection }: {selection?: Selection}) => {
    const [isLink, setIsLink] = useState(false);
    const [url, setUrl] = useState('');
    const { t } = useTranslation();

    return isLink
        ? (
            <HStack gap="4">
                <Input
                    value={url}
                    onChange={setUrl}
                    placeholder={t('Вставьте ссылку')}
                />
                <Button
                    square
                    disabled={!selection || !url}
                    onClick={() => {
                        document.execCommand(
                            'createLink',
                            false,
                            url,
                        );
                        setUrl('');
                        setIsLink(false);
                    }}
                >
                    {t('Добавить')}
                </Button>
            </HStack>
        )
        : (
            <Button
                square
                onMouseDown={() => {
                    if (selection?.getRangeAt(0).startContainer.parentNode?.nodeName === 'A') {
                        document.execCommand('unlink');
                    } else {
                        setIsLink(true);
                    }
                }}
            >
                <Icon width="24" height="24" Svg={LinkSvg} />
            </Button>
        );
});
