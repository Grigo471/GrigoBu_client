import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleView, ArticleBlockType, ArticleType } from '@/entities/Article';

import ArticlesPage from './ArticlesPage';

const article = {
    1: {
        id: '1',
        title: 'JavaScript news',
        subtitle: 'Что нового в JS за 2023-й год?',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        views: 1022,
        createdAt: '04.09.2023',
        user: {
            id: '1',
            username: 'Grigo',
            avatar: 'https://p.turbosquid.com/ts-thumb/Ax/XUKtDV/FxtkjVoD/homer1200/jpg/1590143115/600x600/fit_q87/c8d0e5a16813b132c3740438479c620649e28627/homer1200.jpg',
        },
        type: [
            ArticleType.SCIENCE,
        ],
        blocks: [
            {
                id: '1',
                type: ArticleBlockType.TEXT,
                title: 'Header',
                paragraphs: [
                    'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                    'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
                    'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
                ],
            },
        ],
    },
    2: {
        id: '2',
        title: 'JavaScript news',
        subtitle: 'Что нового в JS за 2023-й год?',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        views: 1022,
        createdAt: '04.09.2023',
        user: {
            id: '1',
            username: 'Grigo',
            avatar: 'https://p.turbosquid.com/ts-thumb/Ax/XUKtDV/FxtkjVoD/homer1200/jpg/1590143115/600x600/fit_q87/c8d0e5a16813b132c3740438479c620649e28627/homer1200.jpg',
        },
        type: [
            ArticleType.IT,
        ],
        blocks: [
            {
                id: '1',
                type: ArticleBlockType.TEXT,
                title: 'Header',
                paragraphs: [
                    'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                    'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
                    'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
                ],
            },
        ],
    },
    3: {
        id: '3',
        title: 'JavaScript news',
        subtitle: 'Что нового в JS за 2023-й год?',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        views: 1022,
        createdAt: '04.09.2023',
        user: {
            id: '1',
            username: 'Grigo',
            avatar: 'https://p.turbosquid.com/ts-thumb/Ax/XUKtDV/FxtkjVoD/homer1200/jpg/1590143115/600x600/fit_q87/c8d0e5a16813b132c3740438479c620649e28627/homer1200.jpg',
        },
        type: [
            ArticleType.ECONOMICS,
        ],
        blocks: [
            {
                id: '1',
                type: ArticleBlockType.TEXT,
                title: 'Header',
                paragraphs: [
                    'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                    'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
                    'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
                ],
            },
        ],
    },
};

const meta: Meta<typeof ArticlesPage> = {
    title: 'pages/ArticlesPage/ArticlesPage',
    component: ArticlesPage,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof ArticlesPage>;

export const Tiled: Story = {
    args: {

    },
    decorators: [
        StoreDecorator({
            articlesPage: {
                isLoading: false,
                view: ArticleView.SMALL,
                page: 1,
                hasMore: false,
                ids: ['1', '2', '3'],
                entities: article,
                error: undefined,
            },
        }),
    ],
};

export const List: Story = {
    args: {

    },
    decorators: [
        StoreDecorator({
            articlesPage: {
                isLoading: false,
                view: ArticleView.BIG,
                page: 1,
                hasMore: false,
                ids: ['1', '2', '3'],
                entities: article,
            },
        }),
    ],
};

export const Error: Story = {
    args: {

    },
    decorators: [
        StoreDecorator({
            articlesPage: {
                isLoading: false,
                view: ArticleView.BIG,
                page: 1,
                hasMore: false,
                ids: ['1', '2', '3'],
                entities: article,
                error: 'error',
            },
        }),
    ],
};
