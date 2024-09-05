import { FC, lazy } from 'react';
import { AuthFormProps } from './AuthForm';

export const AuthFormAsync = lazy<FC<AuthFormProps>>(() => import('./AuthForm'));
