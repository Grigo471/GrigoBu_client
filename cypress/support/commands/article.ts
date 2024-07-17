import { Article } from '../../../src/entities/Article';

const defaultArticle = {
    title: 'TEST ARTICLE',
    subtitle: 'Что нового в JS за 2023-й год?',
    // eslint-disable-next-line max-len
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
    views: 1022,
    createdAt: '04.09.2023',
    userId: '3',
    type: [
        'IT',
    ],
    blocks: [],
};

export const createArticle = (article?: Article) => cy.request({
    method: 'POST',
    url: 'http://localhost:8000/articles',
    headers: { Authorization: 'a' },
    body: article ?? defaultArticle,
}).then((resp) => resp.body);

export const removeArticle = (articleId: string) => cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: { Authorization: 'a' },
});

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>,
            removeArticle(articleId: string): Chainable<void>,
        }
    }
}
