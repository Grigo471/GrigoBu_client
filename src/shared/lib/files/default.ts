import { CompressOptions } from './options';

export const defaultOptions: CompressOptions = {
    checkOrientation: true,
    retainExif: true,
    quality: 0.8,
    mimeType: 'auto',
    convertTypes: ['image/png'],
    acceptSize: 500000,
    convertSize: 5000000,
};
