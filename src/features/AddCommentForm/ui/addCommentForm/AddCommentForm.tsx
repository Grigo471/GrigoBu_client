import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
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
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { TextArea } from '@/shared/ui/TextArea';
import { useDevice } from '@/shared/lib/hooks/useDevice';
import { Icon } from '@/shared/ui/Icon';
import CircleUp from '@/shared/assets/icons/circle-up.svg';

export interface addCommentFormProps {
   className?: string;
   onSendComment: (text: string) => void;
}

const AddCommentForm = memo((props: addCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation('comments');

    const text = useSelector(getAddCommentFormText);
    const isMobile = useDevice();

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

        <Card padding="24" max>
            <HStack
                data-testid="AddCommentForm"
                justify="between"
                gap="16"
                max
                className={classNames(cls.AddCommentFormRedesigned, {}, [className])}
            >
                <TextArea
                    data-testid="AddCommentForm.input"
                    placeholder={t('Введите текст комментария')}
                    value={text}
                    onChange={onCommentTextChange}
                    className={cls.textarea}
                />
                {isMobile
                    ? <Icon Svg={CircleUp} clickable onClick={onSendHandler} />
                    : (
                        <Button
                            data-testid="AddCommentForm.button"
                            onClick={onSendHandler}
                        >
                            { t('Отправить') }
                        </Button>
                    )}

            </HStack>
        </Card>

    );
});

export default AddCommentForm;
