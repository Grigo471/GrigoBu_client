// compressorjs, (c) Chen Fengyuan

// homepage https://github.com/fengyuanchen/compressorjs

// License: MIT https://github.com/fengyuanchen/compressorjs/blob/main/LICENSE

import { dataURLtoBlob } from './dataUrlToBlob';
import { defaultOptions } from './default';
import { LoadData } from './loadData';
import { CompressOptions } from './options';
import {
    arrayBufferToDataURL,
    imageTypeToExtension,
    isImageType,
    parseOrientation,
    resetAndGetOrientation,
    getExif,
    insertExif,
} from './utilities';

const URL = window.URL || window.webkitURL;
const REGEXP_EXTENSION = /\.\w+$/;

/**
 * Creates a new image compressor.
 * @class
 */
export class ImageCompressor {
    file: File;

    exif: number[];

    image: HTMLImageElement;

    options: CompressOptions = defaultOptions;

    reader: FileReader | null;

    result: File | null;

    /**
     * The constructor of Compressor.
     * @param {File|Blob} file - The target image file for compressing.
     * @param {Object} [options] - The options for compressing.
     */
    constructor(file: File, options: Partial<CompressOptions>) {
        this.file = file;
        this.exif = [];
        this.image = new Image();
        this.options = {
            ...defaultOptions,
            ...options,
        };
        this.reader = null;
        this.result = null;
        this.init();
    }

    init() {
        const { file, options } = this;

        if (file.size < options.acceptSize && options.success) {
            options.success(file);
            return;
        }

        const mimeType = file.type;

        if (!isImageType(mimeType)) {
            this.fail(new Error('The first argument must be an image File or Blob object.'));
            return;
        }

        if (!URL || !FileReader) {
            this.fail(new Error('The current browser does not support image compression.'));
            return;
        }

        if (!ArrayBuffer) {
            options.checkOrientation = false;
            options.retainExif = false;
        }

        const isJPEGImage = mimeType === 'image/jpeg';
        const checkOrientation = isJPEGImage && options.checkOrientation;
        const retainExif = isJPEGImage && options.retainExif;

        const reader = new FileReader();

        this.reader = reader;
        reader.onload = ({ target }) => {
            const result = target?.result as ArrayBuffer;
            const data: LoadData = {
                url: '',
                rotate: 0,
                scaleX: 1,
                scaleY: 1,
            };

            let orientation = 1;

            if (checkOrientation) {
                // Reset the orientation value to its default value 1
                // as some iOS browsers will render image with its orientation
                orientation = resetAndGetOrientation(result);

                if (orientation > 1) {
                    Object.assign(data, parseOrientation(orientation));
                }
            }

            if (retainExif) {
                this.exif = getExif(result);
            }

            if (
                !URL
                    // Generate a new URL with the default orientation value 1.
                    || orientation > 1
            ) {
                data.url = arrayBufferToDataURL(result, mimeType);
            } else {
                data.url = URL.createObjectURL(file);
            }

            this.load(data);
        };
        reader.onerror = () => {
            this.fail(new Error('Failed to read the image with FileReader.'));
        };
        reader.onloadend = () => {
            this.reader = null;
        };

        reader.readAsArrayBuffer(file);
    }

    load(data: LoadData) {
        const { file, image } = this;

        image.onload = () => {
            this.draw({
                ...data,
                width: image.naturalWidth,
                height: image.naturalHeight,
            });
        };
        image.onerror = () => {
            this.fail(new Error('Failed to load the image.'));
        };

        // Match all browsers that use WebKit as the layout engine in iOS devices,
        // such as Safari for iOS, Chrome for iOS, and in-app browsers.
        if (window.navigator
            && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(window.navigator.userAgent)) {
            // Fix the `The operation is insecure` error (#57)
            image.crossOrigin = 'anonymous';
        }

        image.alt = file.name;
        image.src = data.url;
    }

    draw({
        width, height, rotate, scaleX, scaleY,
    }: {
        width: number;
        height: number;
    } & LoadData) {
        const { file, image, options } = this;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const is90DegreesRotated = Math.abs(rotate) % 180 === 90;
        if (is90DegreesRotated) {
            [width, height] = [height, width];
        }

        const destX = -width / 2;
        const destY = -height / 2;
        const destWidth = width;
        const destHeight = height;

        canvas.width = width;
        canvas.height = height;

        if (!isImageType(options.mimeType)) {
            options.mimeType = file.type;
        }

        let fillStyle = 'transparent';

        // Converts PNG files over the `convertSize` to JPEGs.
        if (file.size > options.convertSize
            && options.convertTypes.indexOf(options.mimeType) >= 0) {
            options.mimeType = 'image/jpeg';
        }

        const isJPEGImage = options.mimeType === 'image/jpeg';

        if (isJPEGImage) {
            fillStyle = '#fff';
        }

        if (context) {
            context.fillStyle = fillStyle;
            context.fillRect(0, 0, width, height);
            context.save();
            context.translate(width / 2, height / 2);
            context.rotate((rotate * Math.PI) / 180);
            context.scale(scaleX, scaleY);
            context.drawImage(image, destX, destY, destWidth, destHeight);
            context.restore();
        }
        // Override the default fill color (#000, black)

        const callback: BlobCallback = (blob) => {
            const done = (result: Blob) => this.done(result);

            if (blob && isJPEGImage && options.retainExif && this.exif && this.exif.length > 0) {
                const next = (arrayBuffer: ArrayBuffer) => done(dataURLtoBlob(arrayBufferToDataURL(
                    insertExif(arrayBuffer, this.exif),
                    options.mimeType,
                )));

                if (blob.arrayBuffer) {
                    blob.arrayBuffer().then(next).catch(() => {
                        this.fail(
                            new Error(
                                'Failed to read the compressed image with Blob.arrayBuffer().',
                            ),
                        );
                    });
                } else {
                    const reader = new FileReader();

                    this.reader = reader;
                    reader.onload = ({ target }) => {
                        next(target?.result as ArrayBuffer);
                    };
                    reader.onerror = () => {
                        this.fail(
                            new Error('Failed to read the compressed image with FileReader.'),
                        );
                    };
                    reader.onloadend = () => {
                        this.reader = null;
                    };
                    reader.readAsArrayBuffer(blob);
                }
            } else if (blob) {
                done(blob);
            }
        };

        if (canvas.toBlob) {
            canvas.toBlob(callback, options.mimeType, options.quality);
        } else {
            callback(dataURLtoBlob(canvas.toDataURL(options.mimeType, options.quality)));
        }
    }

    done(result: Blob) {
        const { file, image, options } = this;

        if (URL && image.src.indexOf('blob:') === 0) {
            URL.revokeObjectURL(image.src);
        }

        if (result) {
            let { name } = file;
            // Convert the extension to match its type
            if (result.type !== file.type) {
                name = name.replace(
                    REGEXP_EXTENSION,
                    imageTypeToExtension(result.type),
                );
            }

            const date = new Date();

            this.result = new File([result], name, { lastModified: date.getTime() });
        } else {
            // Returns original file if the result is null in some cases.
            this.result = file;
        }

        if (options.success) {
            options.success.call(this, this.result);
        }
    }

    fail(err: Error) {
        const { options } = this;

        if (options.error) {
            options.error.call(this, err);
        } else {
            throw err;
        }
    }

    /**
     * Change the default options.
     * @param {Object} options - The new default options.
     */
    static setDefaults(options: CompressOptions) {
        Object.assign(defaultOptions, options);
    }
}
