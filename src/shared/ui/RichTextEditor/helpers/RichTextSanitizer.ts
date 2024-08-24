/* eslint-disable no-plusplus */
const _tagWhitelist: Record<string, boolean> = {
    A: true,
    B: true,
    BODY: true,
    BR: true,
    DIV: true,
    I: true,
    P: true,
    SPAN: true,
    STRONG: true,
    U: true,
};

const _attributeWhitelist: Record<string, boolean> = {
    href: true,
    action: true,
};

const _schemaWhiteList = ['http:', 'https:', 'data:', 'm-files:',
    'file:', 'ftp:', 'mailto:', 'pw:']; // which "protocols" are allowed in "href", "src" etc

const _uriAttributes: Record<string, boolean> = {
    href: true,
    action: true,
};

function startsWithAny(str: string, substrings: string[]) {
    for (let i = 0; i < substrings.length; i++) {
        if (str.indexOf(substrings[i]) === 0) {
            return true;
        }
    }
    return false;
}

const _parser = new DOMParser();

export const RichTextSanitizer = (input: string) => {
    input = input.trim();
    if (input === '') return ''; // to save performance

    // firefox "bogus node" workaround for wysiwyg's
    if (input === '<br>') return '';

    if (input.indexOf('<body') === -1) input = `<body>${input}</body>`;

    const doc = _parser.parseFromString(input, 'text/html');

    // DOM clobbering check (damn you firefox)
    if (doc.body.tagName !== 'BODY') doc.body.remove();

    function makeSanitizedCopy(node: any) {
        let newNode;
        if (node.nodeType === Node.TEXT_NODE) {
            newNode = node.cloneNode(true);
        } else if (
            node.nodeType === Node.ELEMENT_NODE
            && _tagWhitelist[node.tagName]
        ) { // is tag allowed?
            newNode = doc.createElement(node.tagName);

            for (let i = 0; i < node.attributes.length; i++) {
                const attr = node.attributes[i];
                if (_attributeWhitelist[attr.name]) {
                    if (_uriAttributes[attr.name]) { // if this is a "uri" attribute, that can have "javascript:" or something
                        if (attr.value.indexOf(':') > -1
                        // eslint-disable-next-line no-continue
                        && !startsWithAny(attr.value, _schemaWhiteList)) continue;
                    }
                    newNode.setAttribute(attr.name, attr.value);
                }
            }
            for (let i = 0; i < node.childNodes.length; i++) {
                const subCopy = makeSanitizedCopy(node.childNodes[i]);
                newNode.appendChild(subCopy, false);
            }

            // remove useless empty spans (lots of those when pasting from MS Outlook)
            if ((newNode.tagName === 'SPAN'
                || newNode.tagName === 'B'
                || newNode.tagName === 'I'
                || newNode.tagName === 'U')
                && newNode.innerHTML.trim() === '') {
                return doc.createDocumentFragment();
            }
        } else {
            newNode = doc.createDocumentFragment();
        }
        return newNode;
    }

    const resultElement = makeSanitizedCopy(doc.body);

    return resultElement.innerHTML
        .replace(/<br[^>]*>(\S)/g, '<br>\n$1')
        .replace(/div><div/g, 'div>\n<div'); // replace is just for cleaner code
};
