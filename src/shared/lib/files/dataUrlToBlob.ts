const dataURIPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/;

// From https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob, needed for Safari:
if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value(callback: (blob: Blob) => void, type: 'string', quality: 'number') {
            const binStr = window.atob(this.toDataURL(type, quality).split(',')[1]);
            const len = binStr.length;
            const arr = new Uint8Array(len);

            for (let i = 0; i < len; i += 1) {
                arr[i] = binStr.charCodeAt(i);
            }

            callback(new Blob([arr], { type: type || 'image/png' }));
        },
    });
}

export function dataURLtoBlob(dataURI: string) {
    let byteString;
    let i;
    // Parse the dataURI components as per RFC 2397
    const matches = dataURI.match(dataURIPattern);
    if (!matches) {
        throw new Error('invalid data URI');
    }
    // Default to text/plain;charset=US-ASCII
    const mediaType = matches[2]
        ? matches[1]
        : `text/plain${matches[3] || ';charset=US-ASCII'}`;
    const isBase64 = !!matches[4];
    const dataString = dataURI.slice(matches[0].length);
    if (isBase64) {
        // Convert base64 to raw binary data held in a string:
        byteString = window.atob(dataString);
    } else {
        // Convert base64/URLEncoded data component to raw binary:
        byteString = decodeURIComponent(dataString);
    }
    // Write the bytes of the string to an ArrayBuffer:
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (i = 0; i < byteString.length; i += 1) {
        intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([intArray], {
        type: mediaType,
    });
}
