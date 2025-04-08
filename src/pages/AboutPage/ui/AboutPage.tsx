import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { RichTextOutput } from '@/shared/ui/RichTextEditor';
import { FrontEndStack } from '../model/consts/frontendStack';
import { StackItem } from './StackItem/StackItem';
import { BackEndStack } from '../model/consts/backendStack';
import { AppImage } from '@/shared/ui/AppImage';
import MyImage from '@/shared/assets/me.jpg';
import cls from './AboutPage.module.scss';
import { Card } from '@/shared/ui/Card';

const AboutPage = () => {
    const { t } = useTranslation('about');

    return (
        <Page data-testid="MainPage">
            <VStack max gap="16">
                <Card className={cls.about}>
                    <AppImage src={MyImage} alt={t("It's me")} className={cls.myImage} />
                    <Text
                        title={t('Добро пожаловать!')}
                        bold
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
                        <p>Здесь вы можете просматривать, создавать, 
                        редактировать, оценивать и комментировать статьи, 
                        подписываться на других пользователей и влиять на их рейтинг.</p>
                        <p>
                        Исходный код проекта:<br>
                        <strong>Frontend:</strong> 
                        <a href="https://github.com/Grigo471/GrigoBu_client">
                            https://github.com/Grigo471/GrigoBu_client
                        </a><br>
                        <strong>Backend:</strong> 
                        <a href="https://github.com/Grigo471/GrigoBu_server">
                            https://github.com/Grigo471/GrigoBu_server
                        </a>
                        </p>
                        <p>Подробнее об устройстве данного сайта Вы можете прочитать 
                        <a href='/article/1'>в этой статье.</a>
                        </p>
                        <p>В проекте используется следующий стек технологий:</p>
                        `
                        }
                    />
                </Card>

                <Text title={t('Фронтенд: ')} size="l" align="center" className={cls.frontend} />
                <HStack wrap="wrap" gap="32" align="start" justify="center" max>
                    {FrontEndStack.map(
                        (item) => <StackItem item={item} />,
                    )}
                </HStack>

                <Text title={t('Бэкенд: ')} size="l" align="center" className={cls.backend} />
                <HStack wrap="wrap" gap="32" align="start" justify="center" max>
                    {BackEndStack.map(
                        (item) => <StackItem item={item} />,
                    )}
                </HStack>
            </VStack>
        </Page>
    );
};

export default AboutPage;
