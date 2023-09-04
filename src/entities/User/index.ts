export {
    UserSchema,
    User,
} from './model/types/user';

export {
    userActions,
    userReducer,
} from './model/slice/userSlice';

export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';

export { getUserInited } from './model/selectors/getUserInited/getUserInited';
