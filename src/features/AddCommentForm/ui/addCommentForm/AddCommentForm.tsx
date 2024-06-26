import { type PropsWithChildren, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { ReducerList, useDynamicModuleLoad } from 'shared/lib/hooks/useDynamicModuleLoad';
import { HStack } from 'shared/ui/Stack';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import cls from './AddCommentForm.module.scss';

export interface addCommentFormProps {
   className?: string;
   onSendComment: (text: string) => void;
}

const AddCommentForm = memo((props: PropsWithChildren<addCommentFormProps>) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation('article');

    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);

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
        <HStack justify="between" max className={classNames(cls.AddCommentForm, {}, [className])}>
            <Input
                placeholder={t('Введите текст комментария')}
                value={text}
                onChange={onCommentTextChange}
                className={cls.input}
            />
            <Button
                theme={ThemeButton.OUTLINE}
                onClick={onSendHandler}
            >
                {t('Отправить')}
            </Button>
        </HStack>
    );
});

export default AddCommentForm;
