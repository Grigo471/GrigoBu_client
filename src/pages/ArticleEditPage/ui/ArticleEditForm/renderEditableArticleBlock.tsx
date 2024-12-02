import { ArticleBlock } from '@/entities/Article';
import {
    EditableArticleCodeBlock,
} from '../EditableArticleBlocks/EditableArticleCodeBlock/EditableArticleCodeBlock';
import {
    EditableArticleTextBlock,
} from '../EditableArticleBlocks/EditableArticleTextBlock/EditableArticleTextBlock';
import {
    EditableArticleImageBlock,
} from '../EditableArticleBlocks/EditableArticleImageBlock/EditableArticleImageBlock';

interface RenderEditableArticleBlockProps {
    block: ArticleBlock;
    index: number;
}

export const renderEditableArticleBlock = (props: RenderEditableArticleBlockProps) => {
    const { block, index } = props;

    switch (block.type) {
    case 'code':
        return (
            <EditableArticleCodeBlock
                block={block}
                index={index}
                key={block.id + block.type}
            />
        );
    case 'text':
        return (
            <EditableArticleTextBlock
                block={block}
                index={index}
                key={block.id + block.type}
            />
        );
    case 'image':
        return (
            <EditableArticleImageBlock
                block={block}
                index={index}
                key={block.id + block.type}
            />
        );
    default:
        return null;
    }
};
