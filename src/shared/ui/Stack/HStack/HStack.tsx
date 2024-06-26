import { PropsWithChildren } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = PropsWithChildren<Omit<FlexProps, 'direction'>>;

export const HStack = (props: HStackProps) => (
    <Flex direction="row" {...props} />
);
