export type {
    UserSchema,
    User,
} from './model/types/user';

export {
    UserRole,
} from './model/consts/consts';

export {
    userActions,
    userReducer,
} from './model/slice/userSlice';

export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';

export { getUserInited } from './model/selectors/getUserInited/getUserInited';

export { useJsonSettings } from './model/selectors/getJsonSettings/getJsonSettings';

export {
    isUserAdmin, isUserManager, getUserRoles,
} from './model/selectors/getUserRoles/getUserRoles';

export { saveJsonSettings } from './model/services/saveJsonSettings';
export { initAuthData } from './model/services/initAuthData';
