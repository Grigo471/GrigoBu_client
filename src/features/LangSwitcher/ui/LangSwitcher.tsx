import { memo, type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
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

        <Button
            variant="clear"
            onClick={toggle}
        >
            {t(short ? 'Короткий язык' : 'Язык')}
        </Button>

    );
});
