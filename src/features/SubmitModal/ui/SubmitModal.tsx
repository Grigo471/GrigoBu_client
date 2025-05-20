import {
    type PropsWithChildren, memo, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';

interface SubmitModalProps {
   className?: string;
   submitText?: string;
   cancelText?: string;
   onSubmit: () => void;
   onCancel?: () => void;
   isOpen: boolean;
   onClose: () => void;
}

export const SubmitModal = memo((props: PropsWithChildren<SubmitModalProps>) => {
    const {
        className, children,
        onSubmit, onCancel,
        submitText, cancelText,
        isOpen, onClose,
    } = props;
    const { t } = useTranslation();

    const submitHandler = useCallback(() => {
        if (onSubmit) onSubmit();
        onClose();
    }, [onClose, onSubmit]);

    const cancelHandler = useCallback(() => {
        if (onCancel) onCancel();
        onClose();
    }, [onClose, onCancel]);

    return (
        <Modal isOpen={isOpen} className={className}>
            <VStack max gap="32">
                {children}
                <HStack max gap="16" justify="end">
                    <Button onClick={submitHandler} color="normal">
                        {submitText || t('Подтвердить')}
                    </Button>
                    <Button onClick={cancelHandler} color="error">
                        {cancelText || t('Отмена')}
                    </Button>
                </HStack>
            </VStack>
        </Modal>
    );
});
