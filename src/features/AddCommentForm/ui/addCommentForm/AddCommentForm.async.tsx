import { lazy, FC } from 'react';
import { addCommentFormProps } from './AddCommentForm';

export const AddCommentFormAsync = lazy<FC<addCommentFormProps>>(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AddCommentForm')), 1500);
}));
