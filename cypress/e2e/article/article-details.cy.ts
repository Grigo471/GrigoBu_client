let currentArticleId = '';

describe('Пользователь заходит на страницу статьи', () => {
    beforeEach(() => {
        cy.login();
        cy.createArticle().then((article) => {
            currentArticleId = article.id;
            cy.visit(`articles/${article.id}`);
        });
    });
    afterEach(() => {
        cy.removeArticle(currentArticleId);
    });
    it('И видит содержимое статьи', () => {
        cy.getByTestId('ArticleDetails.info').should('exist');
    });
    it('И видит рекоментации', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
    });
    it('И отправляет комментарий', () => {
        cy.getByTestId('ArticleDetails.info');
        cy.getByTestId('AddCommentForm').scrollIntoView();
        cy.addComment('text');
        cy.getByTestId('CommentCard.content').should('have.length', 1);
    });
    it('И ставит оценку', () => {
        cy.getByTestId('ArticleDetails.info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(5, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 5);
    });
});
