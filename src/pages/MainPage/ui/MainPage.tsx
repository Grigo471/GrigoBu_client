/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Page } from '@/widgets/Page';
import { RichTextEditor } from '@/shared/ui/RichTextEditor';

// eslint-disable-next-line max-len
const content = '<a href="https://codesandbox.io/p/sandbox/nostalgic-tamas-3pk6gr?file=%2Fsrc%2FEditor.jsx%3A25%2C9-25%2C32">https://codesandbox.io/p/sandbox/nostalgic-tamas-3pk6gr?file=%2Fsrc%2FEditor.jsx%3A25%2C9-25%2C32</a>Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка. JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы. Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега ПРОВЕРКА';

const MainPage = () => {
    const { t } = useTranslation('main');

    const [text, setText] = useState(content);

    const onChange = (value: string) => setText(value);

    return (
        <Page data-testid="MainPage">
            {t('Главная страница')}
            {/* {text} */}
            <div dangerouslySetInnerHTML={{ __html: text }} />
            <RichTextEditor placeholder="Введите текст статьи" value={text} onChange={onChange} />
        </Page>
    );
};

export default MainPage;
