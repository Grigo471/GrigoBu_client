import { ReactElement, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StickyContentLayout.module.scss';
import { TestProps } from '@/shared/types/tests';

interface StickyContentLayoutProps extends TestProps {
   className?: string;
   left?: ReactElement;
   content: ReactElement;
   right?: ReactElement;
}

export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
    const {
        className, left, content, right,
    } = props;

    return (
        <main
            className={classNames(cls.StickyContentLayout, {}, [className])}
            data-testid={props['data-testid'] ?? 'Page'}
        >
            {left && <div className={cls.left}>{left}</div>}
            {right && <div className={cls.right}>{right}</div>}
            <div className={cls.content}>
                {content}
            </div>

        </main>
    );
});
