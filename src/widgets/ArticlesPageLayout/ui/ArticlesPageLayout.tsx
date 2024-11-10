import { ReactElement, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesPageLayout.module.scss';
// eslint-disable-next-line grigo-eslint-plugin/layers-hierarchy-imports
import { ScrollToolbar } from '@/widgets/ScrollToolbar';

interface ArticlesPageLayoutProps {
   className?: string;
   list: ReactElement;
   right?: ReactElement;
}

export const ArticlesPageLayout = memo((props: ArticlesPageLayoutProps) => {
    const {
        className, list, right,
    } = props;

    return (
        <div
            className={classNames(cls.ArticlesPageLayout, {}, [className])}
        >
            <ScrollToolbar className={cls.ScrollToTopButton} />
            <div className={cls.listWrapper}>
                {list}
            </div>
            {right && <div className={cls.right}>{right}</div>}
        </div>
    );
});
