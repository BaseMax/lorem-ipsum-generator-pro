// Lorem Ipsum word bank
const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

const headingWords = [
    'Introduction', 'Overview', 'Background', 'Methodology', 'Analysis', 'Results',
    'Discussion', 'Conclusion', 'Summary', 'Key Points', 'Important Notes',
    'Getting Started', 'Implementation', 'Features', 'Benefits', 'Challenges',
    'Solutions', 'Recommendations', 'Future Work', 'References'
];

const codeSnippets = [
    'function generateRandomNumber() {',
    '  return Math.floor(Math.random() * 100);',
    '}',
    '',
    'const items = data.map(item => {',
    '  return item.value * 2;',
    '});',
    '',
    'if (condition === true) {',
    '  processData();',
    '} else {',
    '  handleError();',
    '}',
    '',
    'class DataProcessor {',
    '  constructor(options) {',
    '    this.options = options;',
    '  }',
    '  ',
    '  process() {',
    '    return this.transform(this.options);',
    '  }',
    '}',
    '',
    'const config = {',
    '  api: "https://api.example.com",',
    '  timeout: 5000,',
    '  retries: 3',
    '};'
];

// Utility functions
function getRandomWord() {
    return loremWords[Math.floor(Math.random() * loremWords.length)];
}

function getRandomHeading() {
    return headingWords[Math.floor(Math.random() * headingWords.length)];
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateWords(count) {
    const words = [];
    for (let i = 0; i < count; i++) {
        words.push(getRandomWord());
    }
    return words;
}

function generateSentence(minWords = 8, maxWords = 15) {
    const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    const words = generateWords(wordCount);
    words[0] = capitalizeFirst(words[0]);
    return words.join(' ') + '.';
}

function generateParagraph(wordLimit) {
    const sentences = [];
    let totalWords = 0;
    
    while (totalWords < wordLimit) {
        const sentence = generateSentence();
        const sentenceWords = sentence.split(' ').length;
        
        if (totalWords + sentenceWords > wordLimit && sentences.length > 0) {
            break;
        }
        
        sentences.push(sentence);
        totalWords += sentenceWords;
    }
    
    return sentences.join(' ');
}

function generateHeading(level) {
    const heading = getRandomHeading();
    return {
        html: `<h${level}>${heading}</h${level}>`,
        markdown: `${'#'.repeat(level)} ${heading}`
    };
}

function generateList(isOrdered, itemCount) {
    const items = [];
    for (let i = 0; i < itemCount; i++) {
        const sentence = generateSentence(4, 8);
        items.push(sentence);
    }
    
    const htmlTag = isOrdered ? 'ol' : 'ul';
    const htmlItems = items.map(item => `  <li>${item}</li>`).join('\n');
    const html = `<${htmlTag}>\n${htmlItems}\n</${htmlTag}>`;
    
    const markdownPrefix = isOrdered ? (i) => `${i + 1}.` : () => '-';
    const markdown = items.map((item, i) => `${markdownPrefix(i)} ${item}`).join('\n');
    
    return { html, markdown };
}

function generateCodeBlock(lineCount) {
    const lines = [];
    
    for (let i = 0; i < lineCount && i < codeSnippets.length; i++) {
        lines.push(codeSnippets[i % codeSnippets.length]);
    }
    
    const code = lines.join('\n');
    const html = `<pre><code>${code}</code></pre>`;
    const markdown = '```javascript\n' + code + '\n```';
    
    return { html, markdown };
}

// Main generator function
function generateLoremIpsum(options) {
    const {
        paragraphs = 3,
        wordLimit = 50,
        includeHeadings = true,
        headingLevel = 2,
        includeOrderedList = false,
        includeUnorderedList = false,
        listItems = 5,
        includeCodeBlock = false,
        codeLines = 8
    } = options;
    
    const htmlParts = [];
    const markdownParts = [];
    
    // Generate paragraphs with optional headings
    for (let i = 0; i < paragraphs; i++) {
        if (includeHeadings) {
            const heading = generateHeading(headingLevel);
            htmlParts.push(heading.html);
            markdownParts.push(heading.markdown);
        }
        
        const paragraph = generateParagraph(wordLimit);
        htmlParts.push(`<p>${paragraph}</p>`);
        markdownParts.push(paragraph);
        
        // Add a list after the first paragraph
        if (i === 0 && (includeOrderedList || includeUnorderedList)) {
            if (includeOrderedList) {
                const list = generateList(true, listItems);
                htmlParts.push(list.html);
                markdownParts.push(list.markdown);
            }
            if (includeUnorderedList) {
                const list = generateList(false, listItems);
                htmlParts.push(list.html);
                markdownParts.push(list.markdown);
            }
        }
        
        // Add code block after the second paragraph
        if (i === 1 && includeCodeBlock) {
            const code = generateCodeBlock(codeLines);
            htmlParts.push(code.html);
            markdownParts.push(code.markdown);
        }
    }
    
    return {
        html: htmlParts.join('\n'),
        markdown: markdownParts.join('\n\n')
    };
}

// DOM Elements
const elements = {
    paragraphs: document.getElementById('paragraphs'),
    wordLimit: document.getElementById('wordLimit'),
    includeHeadings: document.getElementById('includeHeadings'),
    headingLevel: document.getElementById('headingLevel'),
    headingLevelGroup: document.getElementById('headingLevelGroup'),
    includeOrderedList: document.getElementById('includeOrderedList'),
    includeUnorderedList: document.getElementById('includeUnorderedList'),
    listItemsGroup: document.getElementById('listItemsGroup'),
    listItems: document.getElementById('listItems'),
    includeCodeBlock: document.getElementById('includeCodeBlock'),
    codeLinesGroup: document.getElementById('codeLinesGroup'),
    codeLines: document.getElementById('codeLines'),
    generateBtn: document.getElementById('generateBtn'),
    copyBtn: document.getElementById('copyBtn'),
    htmlPreview: document.getElementById('htmlPreview'),
    markdownPreview: document.getElementById('markdownPreview'),
    htmlViewBtn: document.getElementById('htmlViewBtn'),
    markdownViewBtn: document.getElementById('markdownViewBtn')
};

// State
let currentContent = { html: '', markdown: '' };

// Event Listeners
elements.includeHeadings.addEventListener('change', (e) => {
    elements.headingLevelGroup.style.display = e.target.checked ? 'block' : 'none';
});

elements.includeOrderedList.addEventListener('change', updateListItemsVisibility);
elements.includeUnorderedList.addEventListener('change', updateListItemsVisibility);

elements.includeCodeBlock.addEventListener('change', (e) => {
    elements.codeLinesGroup.style.display = e.target.checked ? 'block' : 'none';
});

function updateListItemsVisibility() {
    const showListItems = elements.includeOrderedList.checked || elements.includeUnorderedList.checked;
    elements.listItemsGroup.style.display = showListItems ? 'block' : 'none';
}

elements.generateBtn.addEventListener('click', generateContent);

elements.copyBtn.addEventListener('click', copyToClipboard);

elements.htmlViewBtn.addEventListener('click', () => {
    switchView('html');
});

elements.markdownViewBtn.addEventListener('click', () => {
    switchView('markdown');
});

// Functions
function generateContent() {
    const options = {
        paragraphs: parseInt(elements.paragraphs.value),
        wordLimit: parseInt(elements.wordLimit.value),
        includeHeadings: elements.includeHeadings.checked,
        headingLevel: parseInt(elements.headingLevel.value),
        includeOrderedList: elements.includeOrderedList.checked,
        includeUnorderedList: elements.includeUnorderedList.checked,
        listItems: parseInt(elements.listItems.value),
        includeCodeBlock: elements.includeCodeBlock.checked,
        codeLines: parseInt(elements.codeLines.value)
    };
    
    currentContent = generateLoremIpsum(options);
    
    elements.htmlPreview.innerHTML = currentContent.html;
    elements.markdownPreview.textContent = currentContent.markdown;
}

function copyToClipboard() {
    const isHtmlView = elements.htmlViewBtn.classList.contains('active');
    const textToCopy = isHtmlView ? currentContent.html : currentContent.markdown;
    
    if (!textToCopy) {
        alert('Please generate content first!');
        return;
    }
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = elements.copyBtn.textContent;
        elements.copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            elements.copyBtn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    });
}

function switchView(view) {
    if (view === 'html') {
        elements.htmlViewBtn.classList.add('active');
        elements.markdownViewBtn.classList.remove('active');
        elements.htmlPreview.classList.add('active');
        elements.markdownPreview.classList.remove('active');
    } else {
        elements.htmlViewBtn.classList.remove('active');
        elements.markdownViewBtn.classList.add('active');
        elements.htmlPreview.classList.remove('active');
        elements.markdownPreview.classList.add('active');
    }
}

// Generate initial content on page load
window.addEventListener('DOMContentLoaded', () => {
    generateContent();
});
