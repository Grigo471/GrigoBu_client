import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, CheckboxItem } from '@/shared/ui/Radio';

export type UsersSubsRelation = 'subscribers' | 'subscriptions';

interface UsersSubsCheckboxProps {
   value?: UsersSubsRelation;
   onChange: (rate: UsersSubsRelation) => void;
   className?: string;
}

export const UsersSubsCheckbox = memo((props: UsersSubsCheckboxProps) => {
    const { className, value, onChange } = props;
    const { t } = useTranslation();

    const items: CheckboxItem<UsersSubsRelation>[] = [
        {
            value: 'subscriptions',
            label: t('Мои подписки'),
        },
        {
            value: 'subscribers',
            label: t('Мои подписчики'),
        },
    ];

    return (
        <Checkbox<UsersSubsRelation>
            items={items}
            name="myRateCheckbox"
            value={value}
            onChange={onChange}
            direction="column"
            className={className}
        />
    );
});