import { memo, useCallback, useState } from 'react';
import { Input, InputProps } from '../Input';
import cls from './PasswordInput.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../../Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import EyeCrossedIcon from '@/shared/assets/icons/eye-crossed.svg';

export const PasswordInput = memo((props: Omit<InputProps, 'type'>) => {
    const [isHidden, setIsHidden] = useState(true);
    const { className, ...otherProps } = props;

    const toggleHidden = useCallback(() => {
        setIsHidden((prev) => !prev);
    }, []);

    return (
        <div className={classNames(cls.PasswordInput, {}, [className])}>
            <Input {...otherProps} type={isHidden ? 'password' : 'text'} className={cls.input} />
            <Icon
                Svg={isHidden ? EyeIcon : EyeCrossedIcon}
                clickable
                onClick={toggleHidden}
                className={cls.eye}
            />
        </div>
    );
});
