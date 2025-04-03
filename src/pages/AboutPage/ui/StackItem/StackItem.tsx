import { Text } from '@/shared/ui/Text';
import { StackItemType } from '../../model/types/stackItem';
import { VStack } from '@/shared/ui/Stack';
import cls from './StackItem.module.scss';

export const StackItem = ({ item }: {item: StackItemType}) => {
    const {
        Svg, path, title, text,
    } = item;
    return (
        <VStack align="center" gap="16" className={cls.StackItem}>
            <Svg width={64} height={64} />
            <a href={path}>
                <Text align="center" size="l" title={title} />
                <Text align="center" text={text} />
            </a>
        </VStack>
    );
};
