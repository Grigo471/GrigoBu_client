let profileId = '';

describe('Пользователь заходит на страницу профиля', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`profile/${data.id}`);
        });
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    });
    it('Профиль загружается', () => {
        cy.getByTestId('ProfileCard.FirstName').should('have.value', 'Testus');
    });
    it('И редактирует его', () => {
        const newName = 'new';
        const newLastName = 'lastname';
        cy.updateProfile(newName, newLastName);
        cy.getByTestId('ProfileCard.FirstName').should('have.value', newName);
        cy.getByTestId('ProfileCard.LastName').should('have.value', newLastName);
    });
});
