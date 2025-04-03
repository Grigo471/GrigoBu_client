import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { RichTextOutput } from '@/shared/ui/RichTextEditor';
import { FrontEndStack } from '../model/consts/stacks';
import { StackItem } from './StackItem/StackItem';

const AboutPage = () => {
    const { t } = useTranslation('main');

    return (
        <Page data-testid="MainPage">
            <VStack max gap="16">
                <Text
                    title={t('Добро пожаловать!')}
                    bold
                    size="l"
                />
                <Text
                    text={t('Это учебный проект, выполненный на основе курса Тимура Ульби')}
                    size="l"
                />
                <RichTextOutput
                    value={
                        `
                        <p>Меня зовут Сергей, я начинающий фронтенд разработчик. 
                        Этот проект я разработал в качестве демонстрации своих умений, 
                        он является усовершенствованной фулл-стек версией проекта, 
                        который создается в ходе курса от Тимура Ульби 
                        <a href='https://ulbitv.ru/frontend'>
                        "Продвинутый Frontend. В production на React".
                        </a></p>
                        <p>В проекте используется большой стек технологий:</p>
                        `
                    }
                />
                <Text title={t('Фронтенд: ')} size="l" align="center" />
                <HStack wrap="wrap" gap="16" align="start">
                    {FrontEndStack.map(
                        (item) => <StackItem item={item} />,
                    )}
                </HStack>
            </VStack>
        </Page>
    );
};

export default AboutPage;
