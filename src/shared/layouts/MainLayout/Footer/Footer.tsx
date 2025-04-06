/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import TelegramIcon from '@/shared/assets/footerIcons/telegram.svg';
import GithubIcon from '@/shared/assets/footerIcons/github.svg';
import WhatsAppIcon from '@/shared/assets/footerIcons/whatsapp.svg';
import GmailIcon from '@/shared/assets/footerIcons/gmail.svg';
import cls from './Footer.module.scss';
import { Icon } from '@/shared/ui/Icon';

export const FooterItem = memo((
    { href, Svg }: { href: string; Svg: React.VFC<React.SVGProps<SVGSVGElement>> },
) => (
    <a href={href}>
        <Icon clickable Svg={Svg} width={32} height={32} />
    </a>
));

export const Footer = memo(() => (
    <VStack max align="center" className={cls.Footer}>
        <HStack max justify="center" gap="32">
            <FooterItem Svg={TelegramIcon} href="https://t.me/stilniysawman" />

            <FooterItem Svg={GithubIcon} href="https://github.com/Grigo471" />

            <FooterItem Svg={WhatsAppIcon} href="https://wa.me/79911354581" />

            <FooterItem Svg={GmailIcon} href="mailto:grigo471@gmail.com" />
        </HStack>

        <p>grigo471@gmail.com</p>
    </VStack>

));
