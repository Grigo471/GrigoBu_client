import 'whatwg-fetch';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Profile } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { $api } from 'shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
    id: '1',
    username: 'admin',
    age: 23,
    country: Country.Russia,
    last: 'Fisher',
    first: 'Bob',
    city: 'LA',
    currency: Currency.USD,
};

const options = {
    initialState: {
        profile: {
            readOnly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: {
                id: '1',
                username: 'admin',
            },
        },
    },
    asyncReducers: { profile: profileReducer },
};

describe('features/EditableProfileCard', () => {
    beforeEach(() => {
        componentRender(<EditableProfileCard id="1" />, options);
    });
    test('Переходит в режим редактирования', async () => {
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
    });

    test('При отмене данные откатываются', async () => {
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'));
        await userEvent.clear(screen.getByTestId('ProfileCard.LastName'));

        await userEvent.type(screen.getByTestId('ProfileCard.FirstName'), 'Kanye');
        await userEvent.type(screen.getByTestId('ProfileCard.LastName'), 'West');

        expect(screen.getByTestId('ProfileCard.FirstName')).toHaveValue('Kanye');
        expect(screen.getByTestId('ProfileCard.LastName')).toHaveValue('West');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

        expect(screen.getByTestId('ProfileCard.FirstName')).toHaveValue('Bob');
        expect(screen.getByTestId('ProfileCard.LastName')).toHaveValue('Fisher');
    });

    test('Появляется ошибка', async () => {
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'));

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
    });

    test('Если нет ошибок валидации, должен уйти PUT запрос', async () => {
        const mockPutReq = jest.spyOn($api, 'put');
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'));

        await userEvent.type(screen.getByTestId('ProfileCard.FirstName'), 'Kanye');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

        expect(mockPutReq).toHaveBeenCalled();
    });
});
