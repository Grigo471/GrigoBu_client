import { memo, ReactNode, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import CrossIcon from '@/shared/assets/icons/cross-delete.svg';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Icon } from '@/shared/ui/Icon';
import { articleEditPageActions } from '../../../model/slice/ArticleEditPageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Text } from '@/shared/ui/Text';
import cls from './EditableArticleBlockWrapper.module.scss';
import {
    getArticleEditPageBlocksLength,
} from '../../../model/selectors/articleEditPageSelectors';
import { useArticleFiles } from '../../ArticleFilesProvider/ArticleFilesProvider';
import { ArticleBlock } from '@/entities/Article';

interface EditableArticleBlockWrapperProps {
   className?: string;
   index: number;
   children: ReactNode;
   title: string;
   block: ArticleBlock;
}

export const EditableArticleBlockWrapper = memo((props: EditableArticleBlockWrapperProps) => {
    const {
        className, index, children, title, block,
    } = props;

    const dispatch = useAppDispatch();
    const blocksLength = useSelector(getArticleEditPageBlocksLength);
    const { deleteImage } = useArticleFiles();

    const canMoveUp = index > 0;
    const canMoveDown = blocksLength && (index < blocksLength - 1);

    const onMoveBlockUp = useCallback((index: number) => {
        if (canMoveUp) dispatch(articleEditPageActions.moveBlockUp(index));
    }, [dispatch, canMoveUp]);

    const onMoveBlockDown = useCallback((index: number) => {
        if (canMoveDown) dispatch(articleEditPageActions.moveBlockDown(index));
    }, [dispatch, canMoveDown]);

    const onDeleteBlock = useCallback((index: number) => {
        if (block.type === 'image') {
            const { src } = block;
            const fileName = src.split('/').pop();
            if (fileName) deleteImage(fileName);
        }
        dispatch(articleEditPageActions.deleteBlock(index));
    }, [dispatch, deleteImage, block]);

    return (
        <Card
            max
            padding="16"
            className={className}
        >
            <VStack max gap="12">
                <HStack max justify="between">
                    <Text title={title} size="m" />
                    <HStack>
                        <Icon
                            className={cls.up}
                            Svg={ArrowIcon}
                            clickable
                            onClick={() => onMoveBlockUp(index)}
                        />
                        <Icon
                            Svg={ArrowIcon}
                            clickable
                            onClick={() => onMoveBlockDown(index)}
                        />
                        <Icon
                            className={cls.cross}
                            width={16}
                            Svg={CrossIcon}
                            clickable
                            onClick={() => onDeleteBlock(index)}
                        />
                    </HStack>
                </HStack>
                {children}
            </VStack>
        </Card>
    );
});
