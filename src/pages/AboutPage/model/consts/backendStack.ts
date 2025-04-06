import NestJSIcon from '@/shared/assets/stackIcons/nestjs.svg';
import SequelizeIcon from '@/shared/assets/stackIcons/sequelize.svg';
import PostgreSQLIcon from '@/shared/assets/stackIcons/psql.svg';
import { StackItemType } from '../types/stackItem';
import NodeJSIcon from '@/shared/assets/stackIcons/nodejs.svg';

export const BackEndStack: StackItemType[] = [
    {
        title: 'NestJS',
        text: 'Основной фреймворк',
        path: 'https://docs.nestjs.com/',
        Svg: NestJSIcon,
    },
    {
        title: 'Sequelize',
        text: 'ORM для работы с базой данных',
        path: 'https://sequelize.org/',
        Svg: SequelizeIcon,
    },
    {
        title: 'PostgreSQL',
        text: 'База данных',
        path: 'https://www.postgresql.org/',
        Svg: PostgreSQLIcon,
    },
    {
        title: 'NodeJS',
        text: 'Среда разработки',
        path: 'https://nodejs.org/',
        Svg: NodeJSIcon,
    },
];
