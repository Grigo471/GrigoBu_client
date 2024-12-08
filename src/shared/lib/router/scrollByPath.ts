export const scrollByPath: Record<string, number> = {};
export const resetScrolls = () => {
    Object.keys(scrollByPath).forEach((key) => { scrollByPath[key] = 0; });
};
