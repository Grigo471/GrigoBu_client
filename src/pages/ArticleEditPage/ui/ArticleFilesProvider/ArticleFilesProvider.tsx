import {
    createContext,
    PropsWithChildren, useContext,
    useMemo,
    useState,
} from 'react';

interface ArticleFilesContextProps {
    images?: File[];
    setImages?: (images: File[]) => void;
}
const ArticleFilesContext = createContext<ArticleFilesContextProps>({});

const ArticleFilesProvider = ({ children }: PropsWithChildren) => {
    const [images, setImages] = useState<File[]>([]);

    const defaultProps = useMemo(() => ({ images, setImages }), [images, setImages]);

    return (
        <ArticleFilesContext.Provider value={defaultProps}>
            {children}
        </ArticleFilesContext.Provider>
    );
};

export default ArticleFilesProvider;

interface UseArticleFilesResult {
    images?: File[];
    addImage: (image: File) => void;
    deleteImage: (fileName: string) => void;
}

export function useArticleFiles(): UseArticleFilesResult {
    const { images, setImages } = useContext(ArticleFilesContext);

    const addImage = (image: File) => {
        images?.push(image);
        if (images) setImages?.(images);
    };

    const deleteImage = (fileName: string) => {
        if (images) setImages?.(images.filter((image) => image.name.split('.')[0] !== fileName));
    };

    return { images, addImage, deleteImage };
}
