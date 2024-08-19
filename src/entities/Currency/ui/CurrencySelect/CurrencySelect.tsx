import { useTranslation } from 'react-i18next';

import { useCallback, type PropsWithChildren, memo } from 'react';
import { Currency } from '../../model/types/currency';
import { ListBox } from '@/shared/ui/Popups';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo((props: PropsWithChildren<CurrencySelectProps>) => {
    const {
        className, value, onChange, readonly,
    } = props;

    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    return (

        <ListBox
            value={value}
            defaultValue={t('Валюта')}
            label={t('Валюта')}
            items={options}
            onChange={onChangeHandler}
            className={className}
            readonly={readonly}
            direction="topRight"
        />

    // <Select
    //     className={classNames('', {}, [className])}
    //     label={t('Валюта')}
    //     options={options}
    //     value={value}
    //     onChange={onChangeHandler}
    //     readonly={readonly}
    // />
    );
});
