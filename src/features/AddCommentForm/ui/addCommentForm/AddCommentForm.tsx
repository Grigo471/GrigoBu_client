import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { HStack } from '@/shared/ui/Stack';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import {
    getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import cls from './AddCommentForm.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

export interface addCommentFormProps {
   className?: string;
   onSendComment: (text: string) => void;
}

const AddCommentForm = memo((props: addCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation('article');

    const text = useSelector(getAddCommentFormText);

    const reducers: ReducerList = {
        addCommentForm: addCommentFormReducer,
    };

    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onSendComment, onCommentTextChange, text]);

    useDynamicModuleLoad({ reducers });

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Card padding="24" border="round" max>
                    <HStack
                        data-testid="AddCommentForm"
                        justify="between"
                        gap="16"
                        max
                        className={classNames(cls.AddCommentFormRedesigned, {}, [className])}
                    >
                        <Input
                            data-testid="AddCommentForm.input"
                            placeholder={t('Введите текст комментария')}
                            value={text}
                            onChange={onCommentTextChange}
                            className={cls.input}
                        />
                        <Button
                            data-testid="AddCommentForm.button"
                            onClick={onSendHandler}
                        >
                            {t('Отправить')}
                        </Button>
                    </HStack>
                </Card>
            )}
            off={(
                <HStack
                    data-testid="AddCommentForm"
                    justify="between"
                    max
                    className={classNames(cls.AddCommentForm, {}, [className])}
                >
                    <InputDeprecated
                        data-testid="AddCommentForm.input"
                        placeholder={t('Введите текст комментария')}
                        value={text}
                        onChange={onCommentTextChange}
                        className={cls.input}
                    />
                    <ButtonDeprecated
                        data-testid="AddCommentForm.button"
                        theme={ThemeButton.OUTLINE}
                        onClick={onSendHandler}
                    >
                        {t('Отправить')}
                    </ButtonDeprecated>
                </HStack>
            )}
        />
    );
});

export default AddCommentForm;
