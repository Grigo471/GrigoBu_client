import { memo, type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
 className?: string;
 short?:boolean;
}

export const LangSwitcher = memo((props: PropsWithChildren<LangSwitcherProps>) => {
    const { className, short } = props;

    const { t, i18n } = useTranslation();

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Button
                    variant="clear"
                    onClick={toggle}
                >
                    {t(short ? 'Короткий язык' : 'Язык')}
                </Button>
            )}
            off={(
                <ButtonDeprecated
                    className={classNames('', {}, [className])}
                    theme={ThemeButton.CLEAR_INVERTED}
                    onClick={toggle}
                >
                    {t(short ? 'Короткий язык' : 'Язык')}
                </ButtonDeprecated>
            )}
        />
    );
});
