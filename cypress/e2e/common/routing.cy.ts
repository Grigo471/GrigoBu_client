import { selectByTestID } from 'cypress/helpers/selectByTestId';

describe('Роутинг', () => {
    describe('Пользователь не авторизован', () => {
        it('Переход на главную страницу', () => {
            cy.visit('/');
            cy.get(selectByTestID('MainPage')).should('exist');
        });
        it('Переход на страницу профиля', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestID('MainPage')).should('exist');
        });
        it('Переход на несуществующий маршрут', () => {
            cy.visit('/fhghjkjk');
            cy.get(selectByTestID('NotFoundPage')).should('exist');
        });
    });

    describe('Пользователь авторизован', () => {
        beforeEach(() => { cy.login('test-user', '123'); });
        it('Переход на страницу профиля', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestID('ProfilePage')).should('exist');
        });
        it('Переход на страницу со списком статей', () => {
            cy.visit('/articles');
            cy.get(selectByTestID('ArticlesPage')).should('exist');
        });
    });
});
