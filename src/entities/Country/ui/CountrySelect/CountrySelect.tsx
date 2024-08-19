import { useTranslation } from 'react-i18next';

import { useCallback, type PropsWithChildren, memo } from 'react';
import { Country } from '../../model/types/country';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = memo((props: PropsWithChildren<CountrySelectProps>) => {
    const {
        className, value, onChange, readonly,
    } = props;

    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (

        <ListBox
            value={value}
            defaultValue={t('Страна')}
            label={t('Страна')}
            items={options}
            onChange={onChangeHandler}
            readonly={readonly}
            direction="topRight"
        />

    // <Select
    //     className={classNames('', {}, [className])}
    //     label={t('Страна')}
    //     options={options}
    //     value={value}
    //     onChange={onChangeHandler}
    //     readonly={readonly}
    // />
    );
});
