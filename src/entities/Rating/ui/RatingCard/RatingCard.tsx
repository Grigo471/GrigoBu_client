import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { StartRating } from '@/shared/ui/StartRating';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { Button, ButtonSize, ThemeButton } from '@/shared/ui/Button';
import { useDevice } from '@/shared/lib/hooks/useDevice';
import { Drawer } from '@/shared/ui/Drawer';

interface RatingCardProps {
   className?: string;
   title?: string;
   feedbackTitle?: string;
   hasFeedback?: boolean;
   onCancel?: (starsCount: number) => void;
   onAccept?: (starsCount: number, feedback?: string) => void;
   rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onAccept,
        onCancel,
        rate = 0,
    } = props;

    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsCount);
        }
    }, [hasFeedback, onAccept]);

    const acceptHandler = () => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    };

    const cancelHandler = () => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    };

    const isMobile = useDevice();

    const modalContent = (
        <>
            <Text title={feedbackTitle} />
            <Input
                data-testid="RatingCard.input"
                value={feedback}
                onChange={setFeedback}
                placeholder={t('Ваш отзыв')}
            />
        </>
    );

    return (
        <Card data-testid="RatingCard" max className={classNames('', {}, [className])}>
            <VStack align="center" gap="8">
                <Text title={starsCount ? t('Спасибо за отзыв!') : title} />
                <StartRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
                {
                    isMobile
                        ? (
                            <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
                                <VStack gap="32">
                                    {modalContent}
                                    <Button
                                        data-testid="RatingCard.send"
                                        onClick={acceptHandler}
                                        size={ButtonSize.L}
                                        fullWidth
                                    >
                                        {t('Отправить')}
                                    </Button>
                                </VStack>
                            </Drawer>
                        )
                        : (
                            <Modal isOpen={isModalOpen} lazy>
                                <VStack max gap="32">
                                    {modalContent}
                                    <HStack max gap="16" justify="end">
                                        <Button
                                            data-testid="RatingCard.close"
                                            onClick={cancelHandler}
                                            theme={ThemeButton.OUTLINE_RED}
                                        >
                                            {t('Закрыть')}
                                        </Button>
                                        <Button
                                            data-testid="RatingCard.send"
                                            onClick={acceptHandler}
                                        >
                                            {t('Отправить')}
                                        </Button>
                                    </HStack>
                                </VStack>
                            </Modal>
                        )
                }

            </VStack>
        </Card>
    );
});
