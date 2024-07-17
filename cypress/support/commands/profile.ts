export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('EditableProfileCardHeader.EditButton').click();
    cy.getByTestId('ProfileCard.FirstName').clear().type(firstname);
    cy.getByTestId('ProfileCard.LastName').clear().type(lastname);
    cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'a' },
    body: {
        id: '3',
        first: 'Testus',
        last: 'Testoff',
        age: 21,
        currency: 'RUS',
        country: 'Russia',
        city: 'LA',
        username: 'test-user',
        // eslint-disable-next-line max-len
        avatar: 'https://steamuserimages-a.akamaihd.net/ugc/942838033007845279/DBC41CC3BB3FDCAF81267BD7A617A655AD73DF0E/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
    },
});

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>,
            resetProfile(prfileId: string): Chainable<void>,
        }
    }
}
