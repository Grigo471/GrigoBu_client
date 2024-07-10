import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line grigo-eslint-plugin/layers-hierarchy-imports
import { UserRole } from '@/entities/User';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
}
