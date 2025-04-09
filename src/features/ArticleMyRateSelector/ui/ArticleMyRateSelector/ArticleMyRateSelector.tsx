import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, CheckboxItem } from '@/shared/ui/Checkbox';
import { Rate } from '@/entities/Article';
import { Text } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { useDevice } from '@/shared/lib/hooks/useDevice';

interface ArticleMyRateSelectorProps {
   rate?: Rate;
   onChange: (rate: Rate) => void;
   className?: string;
}

export const ArticleMyRateSelector = memo((props: ArticleMyRateSelectorProps) => {
    const { className, rate, onChange } = props;
    const { t } = useTranslation('articles');
    const isMobile = useDevice();

    const items: CheckboxItem<Rate>[] = [
        {
            value: 1,
            label: t('Понравилось'),
        },
        {
            value: -1,
            label: t('Не понравилось'),
        },
    ];

    return (
        <VStack gap="8" adaptive>
            {!isMobile && <Text text={t('Моя оценка')} bold />}
            <Checkbox<Rate>
                items={items}
                name="myRateCheckbox"
                value={rate}
                onChange={onChange}
                direction="column"
                adaptive
            />
        </VStack>
    );
});
