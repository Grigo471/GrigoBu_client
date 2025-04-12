import { ExifData } from './loadData';
import { CompressOptions } from './options';
import {
    arrayBufferToDataURL, getExif, isImageType, parseOrientation, resetAndGetOrientation,
} from './utilities';

function getImageExis(
    file: File,
    options: CompressOptions,
    callback: (data: ExifData) => void,
) {
    const isJPEGImage = file.type === 'image/jpeg';
    const checkOrientation = isJPEGImage && options.checkOrientation;
    const retainExif = isJPEGImage && options.retainExif;

    const reader = new FileReader();
    reader.onload = ({ target }) => {
        const result = target?.result as ArrayBuffer;
        const data: ExifData = {
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
            data.exif = getExif(result);
        }

        if (
            !URL
                // Generate a new URL with the default orientation value 1.
                || orientation > 1
        ) {
            data.url = arrayBufferToDataURL(result, file.type);
        } else {
            data.url = URL.createObjectURL(file);
        }

        callback(data);
    };
    reader.onerror = () => {
        throw new Error('Failed to read the image with FileReader.');
    };

    reader.readAsArrayBuffer(file);
}

function drawCanvas(
    width: number,
    height: number,
    file: File,
    img: HTMLImageElement,
    options: CompressOptions,
    data: ExifData,
) {
    const { rotate, scaleX, scaleY } = data;

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
        context.drawImage(img, destX, destY, destWidth, destHeight);
        context.restore();
    }
}

export function compressImage(file: File, options: CompressOptions) {
    if (file.size <= options.acceptSize) {
        return file;
    }

    if (!isImageType(file.type)) {
        throw new Error('The first argument must be an image File or Blob object.');
    }

    if (!URL || !FileReader) {
        throw new Error('The current browser does not support image compression.');
    }

    if (!ArrayBuffer) {
        options.checkOrientation = false;
        options.retainExif = false;
    }

    const img = new Image();
    img.onerror = function (error) {
        throw new Error('Failed to load the image.');
    };
    img.onload = function () {
        getImageExis(file, options, (data) => {

        });
    };

    // Match all browsers that use WebKit as the layout engine in iOS devices,
    // such as Safari for iOS, Chrome for iOS, and in-app browsers.
    if (window.navigator
        && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(window.navigator.userAgent)) {
        // Fix the `The operation is insecure` error (#57)
        img.crossOrigin = 'anonymous';
    }
    img.src = URL.createObjectURL(file);
}
