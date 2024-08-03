import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';
import {
    useAricleRecommendationsList,
} from '../../api/articleRecommendationsApi';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { data: articles, isLoading, error } = useAricleRecommendationsList(3);

    if (isLoading || error || !articles) {
        return null;
    }

    return (
        <VStack
            data-testid="ArticleRecommendationsList"
            gap="8"
            className={classNames('', {}, [className])}
        >
            <ToggleFeatures
                feature="isAppRedesigned"
                on={(
                    <Text
                        title={t('Рекомендуем')}
                        size="l"
                    />
                )}
                off={(
                    <TextDeprecated
                        title={t('Рекомендуем')}
                        size={TextSize.L}
                    />
                )}
            />
            <ArticleList
                articles={articles}
                target="_blank"
            />
        </VStack>
    );
});
