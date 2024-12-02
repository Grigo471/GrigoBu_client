export function srcWithApi(src: string | undefined) {
    return src ? `${__API__}/${src}` : '';
}

export function srcWithApiOrBlob(src: string) {
    return src.split(':')[0] === 'blob' ? src : srcWithApi(src);
}
