import { PropsWithChildren } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = PropsWithChildren<Omit<FlexProps, 'direction'>>;

export const VStack = (props: VStackProps) => {
    const { align = 'start' } = props;

    return (
        <Flex direction="column" {...props} align={align} />
    );
};
