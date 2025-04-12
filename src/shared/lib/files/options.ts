export interface CompressOptions {

    /**
     * Indicates if read the image's Exif Orientation information,
     * and then rotate or flip the image automatically.
     */
    checkOrientation: boolean,

    /**
     * Indicates if retain the image's Exif information after compressed.
    */
    retainExif: boolean,

    /**
     * The quality of the output image.
     * It must be a number between `0` and `1`,
     * and only available for `image/jpeg` and `image/webp` images.
     * Check out {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob canvas.toBlob}.
     */
    quality: number,

    /**
     * The mime type of the output image.
     * By default, the original mime type of the source image file will be used.
     */
    mimeType: string,

    /**
     * Files whose file type is included in this list,
     * and whose file size exceeds the `convertSize` value will be converted to JPEGs.
     */
    convertTypes: string | string[],

    /**
     * files over this size (500 KB by default) will be reduced.
     * To disable this, just set the value to `Infinity`.
     */
    acceptSize: number,

    /**
     * PNG files over this size (5 MB by default) will be converted to JPEGs.
     * To disable this, just set the value to `Infinity`.
     */
    convertSize: number,

    /**
     * The hook function to execute when success to compress the image.
     */
    success?: (file: File) => void,

    /**
     * The hook function to execute when fail to compress the image.
     */
    error?: (error: Error) => void,
}
