export function srcWithApi(src: string | undefined) {
    return src ? `${__API__}/${src}` : '';
}
