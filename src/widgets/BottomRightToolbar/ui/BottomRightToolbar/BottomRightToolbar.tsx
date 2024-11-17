import { memo } from 'react';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { Card } from '@/shared/ui/Card';
import { HStack } from '@/shared/ui/Stack';

interface BottomRightToolbarProps {
   className?: string;
}

export const BottomRightToolbar = memo((props: BottomRightToolbarProps) => {
    const { className } = props;

    return (
        <Card padding="16" className={className}>
            <HStack gap="8">
                <LangSwitcher />
                <ThemeSwitcher />
            </HStack>
        </Card>
    );
});
