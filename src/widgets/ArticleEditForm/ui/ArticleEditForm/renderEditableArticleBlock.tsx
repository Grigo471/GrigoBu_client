import { ArticleBlock, ArticleBlockType } from '@/entities/Article';
import {
    EditableArticleCodeBlock,
    EditableArticleImageBlock,
    EditableArticleTextBlock,
} from '@/features/EditableArticleBlocks';

interface RenderEditableArticleBlockProps {
    block: ArticleBlock;
    index: number;
    onChangeBlockTitle: (title: string, index: number) => void;
    onChangeBlockText: (text: string, index: number) => void;
    onChangeBlockSrc: (src: string, index: number) => void;
    onChangeBlockCode: (code: string, index: number) => void;
    onDeleteBlock: (index: number) => void;
}

export const renderEditableArticleBlock = (props: RenderEditableArticleBlockProps) => {
    const {
        block,
        index,
        onChangeBlockTitle,
        onChangeBlockText,
        onChangeBlockSrc,
        onChangeBlockCode,
        onDeleteBlock,
    } = props;

    switch (block.type) {
    case ArticleBlockType.CODE:
        return (
            <EditableArticleCodeBlock
                block={block}
                index={index}
                onChangeTitle={onChangeBlockTitle}
                onChangeCode={onChangeBlockCode}
                onDeleteBlock={onDeleteBlock}
                key={block.id}
            />
        );
    case ArticleBlockType.TEXT:
        return (
            <EditableArticleTextBlock
                block={block}
                index={index}
                onChangeTitle={onChangeBlockTitle}
                onChangeText={onChangeBlockText}
                onDeleteBlock={onDeleteBlock}
                key={block.id}
            />
        );
    case ArticleBlockType.IMAGE:
        return (
            <EditableArticleImageBlock
                block={block}
                index={index}
                onChangeTitle={onChangeBlockTitle}
                onChangeSrc={onChangeBlockSrc}
                onDeleteBlock={onDeleteBlock}
                key={block.id}
            />
        );
    default:
        return null;
    }
};
