import {
    memo,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleTagsSelector.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import {
    getArticleAllTags,
} from '../../model/selectors/articleTagsSelectors';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import {
    articleTagsSelectoreReducers,
} from '../../model/slice/ArticleTagsSelectorSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { fetchArticleTags } from '../../model/services/fetchArticleTags';
import { Icon } from '@/shared/ui/Icon';
import CrossIcon from '@/shared/assets/icons/cross-delete.svg';
import { ArticleTagCreate } from './ArticleTagCreate';

interface ArticleTagsSelectorProps {
   className?: string;
   withCreate?: boolean;
   chosenTags?: string[];
   setChosenTags: (tags: string[]) => void;
}

const reducers: ReducerList = {
    articleTagsSelector: articleTagsSelectoreReducers,
};

export const ArticleTagsSelector = memo((props: ArticleTagsSelectorProps) => {
    const {
        className, withCreate, chosenTags = [], setChosenTags,
    } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const tags = useSelector(getArticleAllTags);

    useDynamicModuleLoad({ reducers });

    useInitialEffect(() => {
        dispatch(fetchArticleTags());
    });

    const onToggleTag = (tag: string, isSelected: boolean) => {
        if (isSelected) {
            setChosenTags([...chosenTags.filter((t) => t !== tag)]);
        } else {
            setChosenTags([...chosenTags, tag]);
        }
    };

    return (
        <VStack gap="12" className={classNames(cls.ArticleTagsSelector, {}, [className])}>
            {/* <Text text={t('Выберите теги')} size="m" bold /> */}
            {withCreate && (
                <ArticleTagCreate
                    onCreate={(createTag: string) => {
                        onToggleTag(createTag, false);
                    }}
                />
            )}
            {chosenTags.length > 0 && (
                <HStack gap="8" wrap="wrap">
                    {chosenTags.map((tag) => (
                        <Card
                            className={cls.tag}
                            variant="light"
                            key={tag}
                            border="partial"
                            onClick={() => onToggleTag(tag, true)}
                        >
                            <HStack gap="8">
                                {tag}
                                <Icon clickable Svg={CrossIcon} width={10} height={10} />
                            </HStack>
                        </Card>
                    ))}
                </HStack>
            )}
            <HStack gap="4" wrap="wrap" className={cls.tags}>
                {tags.map((tag) => {
                    const isSelected = chosenTags.includes(tag);
                    return (
                        <Card
                            className={cls.tag}
                            variant={isSelected ? 'outlined' : 'light'}
                            key={tag}
                            onClick={() => onToggleTag(tag, isSelected)}
                            border="partial"
                        >
                            {tag}
                        </Card>
                    );
                })}
            </HStack>
        </VStack>
    );
});
