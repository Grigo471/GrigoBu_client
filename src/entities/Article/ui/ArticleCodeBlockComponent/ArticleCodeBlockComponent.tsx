import { memo, type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code as CodeDeprecated } from '@/shared/ui/deprecated/Code';
import { ArticleCodeBlock } from '../../model/types/article';
import cls from './ArticleCodeBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Code } from '@/shared/ui/redesigned/Code';

interface ArticleCodeBlockComponentProps {
   className?: string;
   block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
    (props: PropsWithChildren<ArticleCodeBlockComponentProps>) => {
        const { className, block } = props;
        const { t } = useTranslation();

        return (
            <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Code text={block.code} />}
                    off={<CodeDeprecated text={block.code} />}
                />
            </div>
        );
    },
);
