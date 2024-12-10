interface ViruolizedListProps<T> {
    className?: string;
    data: T[];
}

export function ViruolizedList<T>(props: ViruolizedListProps<T>) {
    const {
        className, data,
    } = props;

    return (
        <div />
    );
}
