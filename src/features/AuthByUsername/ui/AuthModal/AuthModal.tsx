import { Suspense } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Modal } from '@/shared/ui/Modal';
import cls from './AuthModal.module.scss';
import { AuthFormAsync } from '../AuthForm/AuthForm.async';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export function AuthModal(props: LoginModalProps) {
    const { className, isOpen, onClose } = props;

    return (
        <Modal
            className={classNames(cls.AuthModal, {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            { /**
            TODO: fallback
            */}
            <Suspense>
                <AuthFormAsync isOpen={isOpen} />
            </Suspense>
        </Modal>
    );
}
