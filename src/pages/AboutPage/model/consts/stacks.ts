import { StackItemType } from '../types/stackItem';
import ReactIcon from '@/shared/assets/stackIcons/react.svg';
import ReduxIcon from '@/shared/assets/stackIcons/redux.svg';
import SassIcon from '@/shared/assets/stackIcons/sass.svg';
import StorybookIcon from '@/shared/assets/stackIcons/storybook.svg';

export const FrontEndStack: StackItemType[] = [
    {
        title: 'React',
        text: 'Основной фреймворк',
        path: 'https://react.dev/',
        Svg: ReactIcon,
    },
    {
        title: 'Redux Toolkit',
        text: 'Стейт мэнеджер, в связке с RTK Query для выполнения запросов',
        path: 'https://redux-toolkit.js.org/',
        Svg: ReduxIcon,
    },
    {
        title: 'Sass',
        text: 'Препроцессор',
        path: 'https://sass-lang.com/',
        Svg: SassIcon,
    },
    {
        title: 'Storybook',
        text: 'Скриншотные тестирования в связке с Chromatic',
        path: 'https://storybook.js.org/',
        Svg: StorybookIcon,
    },
];
