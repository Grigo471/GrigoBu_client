import { StackItemType } from '../types/stackItem';
import ReactIcon from '@/shared/assets/stackIcons/react.svg';
import ReduxIcon from '@/shared/assets/stackIcons/redux.svg';
import TypescriptIcon from '@/shared/assets/stackIcons/typescript.svg';
import SassIcon from '@/shared/assets/stackIcons/sass.svg';
import StorybookIcon from '@/shared/assets/stackIcons/storybook.svg';
import JestIcon from '@/shared/assets/stackIcons/jest.svg';
import WebpackIcon from '@/shared/assets/stackIcons/webpack.svg';
import NginxIcon from '@/shared/assets/stackIcons/nginx.svg';

export const FrontEndStack: StackItemType[] = [
    {
        title: 'React',
        text: 'Основной фреймворк',
        path: 'https://react.dev/',
        Svg: ReactIcon,
    },
    {
        title: 'Redux Toolkit',
        text: 'Стейт мэнеджер, в связке с RTK Query',
        path: 'https://redux-toolkit.js.org/',
        Svg: ReduxIcon,
    },
    {
        title: 'Typescript',
        text: 'Дополнительный синтаксис для JavaScript',
        path: 'https://www.typescriptlang.org/',
        Svg: TypescriptIcon,
    },
    {
        title: 'Sass',
        text: 'Препроцессор CSS',
        path: 'https://sass-lang.com/',
        Svg: SassIcon,
    },
    {
        title: 'Jest + React Testing Library',
        text: 'Unit и регрессионные теcты',
        path: 'https://jestjs.io/',
        Svg: JestIcon,
    },
    {
        title: 'Storybook',
        text: 'Скриншотные тестирования в связке с Chromatic',
        path: 'https://storybook.js.org/',
        Svg: StorybookIcon,
    },
    {
        title: 'Webpack',
        text: 'Сборщик',
        path: 'https://webpack.js.org/',
        Svg: WebpackIcon,
    },
    {
        title: 'NGINX',
        text: 'Сервер для раздачи статики',
        path: 'https://nginx.org/',
        Svg: NginxIcon,
    },
];
