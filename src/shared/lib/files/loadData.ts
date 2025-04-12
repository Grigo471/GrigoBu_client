export interface LoadData {
    url: string;
    rotate: number;
    scaleX: number;
    scaleY: number;
}

export interface ExifData {
    url: string;
    rotate: number;
    scaleX: number;
    scaleY: number;
    exif?: number[];
}
