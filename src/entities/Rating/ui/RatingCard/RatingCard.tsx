import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { StartRating } from '@/shared/ui/deprecated/StartRating';
import { Modal } from '@/shared/ui/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button as ButtonDeprecated, ButtonSize, ThemeButton } from '@/shared/ui/deprecated/Button';
import { useDevice } from '@/shared/lib/hooks/useDevice';
import { Drawer } from '@/shared/ui/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <>
                    <Text title={feedbackTitle} />
                    <Input
                        data-testid="RatingCard.input"
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                    />
                </>
            )}
            off={(
                <>
                    <TextDeprecated title={feedbackTitle} />
                    <InputDeprecated
                        data-testid="RatingCard.input"
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                    />
                </>
            )}
        />
    );

    const content = (
        <>
            <VStack align="center" gap="8">
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Text title={starsCount ? t('Спасибо за отзыв!') : title} />}
                    off={<TextDeprecated title={starsCount ? t('Спасибо за отзыв!') : title} />}
                />
                <StartRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
            </VStack>
            {
                isMobile
                    ? (
                        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
                            <VStack gap="32">
                                {modalContent}
                                <ToggleFeatures
                                    feature="isAppRedesigned"
                                    on={(
                                        <Button
                                            data-testid="RatingCard.send"
                                            onClick={acceptHandler}
                                            size="l"
                                            fullWidth
                                        >
                                            {t('Отправить')}
                                        </Button>
                                    )}
                                    off={(
                                        <ButtonDeprecated
                                            data-testid="RatingCard.send"
                                            onClick={acceptHandler}
                                            size={ButtonSize.L}
                                            fullWidth
                                        >
                                            {t('Отправить')}
                                        </ButtonDeprecated>
                                    )}
                                />
                            </VStack>
                        </Drawer>
                    )
                    : (
                        <Modal isOpen={isModalOpen} lazy>
                            <VStack max gap="32">
                                {modalContent}
                                <ToggleFeatures
                                    feature="isAppRedesigned"
                                    on={(
                                        <HStack max gap="16" justify="end">
                                            <Button
                                                data-testid="RatingCard.close"
                                                onClick={cancelHandler}
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
                                    )}
                                    off={(
                                        <HStack max gap="16" justify="end">
                                            <ButtonDeprecated
                                                data-testid="RatingCard.close"
                                                onClick={cancelHandler}
                                                theme={ThemeButton.OUTLINE_RED}
                                            >
                                                {t('Закрыть')}
                                            </ButtonDeprecated>
                                            <ButtonDeprecated
                                                data-testid="RatingCard.send"
                                                onClick={acceptHandler}
                                            >
                                                {t('Отправить')}
                                            </ButtonDeprecated>
                                        </HStack>
                                    )}
                                />
                            </VStack>
                        </Modal>
                    )
            }
        </>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Card data-testid="RatingCard" padding="24" border="round" max>
                    {content}
                </Card>
            )}
            off={(
                <CardDeprecated data-testid="RatingCard" max className={className}>
                    {content}
                </CardDeprecated>
            )}
        />
    );
});
