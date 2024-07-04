import { lazy, FC } from 'react';
import { addCommentFormProps } from './AddCommentForm';

export const AddCommentFormAsync = lazy<FC<addCommentFormProps>>(() => import('./AddCommentForm'));
