import { ChangeEvent, PropsWithChildren, useRef } from 'react';

interface FileUploadProps {
   onUpload: (file: File) => void;
   accept: string;
   className?: string;
}

export const FileUpload = (props: PropsWithChildren<FileUploadProps>) => {
    const {
        onUpload, accept, children, className,
    } = props;
    const ref = useRef<HTMLInputElement>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) onUpload(e.target.files[0]);
    };

    return (
        <div onClick={() => ref?.current?.click()} className={className}>
            <input
                type="file"
                accept={accept}
                style={{ display: 'none' }}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    );
};
