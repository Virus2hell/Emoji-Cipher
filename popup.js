// popup.js - Toggle functionality + 100+ emojis
const emojiMap = [
    // Faces (38)
    "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "🥰", "😗", "😙", "😚", "🙂", "🤗", "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "🥱", "😴", "😌",

    // Animals & Birds (40+)
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦓", "🦌", "🐿️", "🦔",

    // Fruits (20+)
    "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑",

    // Vegetables (15+)
    "🥦", "🥬", "🥒", "🌶️", "🫑", "🥕", "🌽", "🥔", "🍠", "🫚", "🧄", "🧅", "🥜", "🌰", "🫘", "🍄"
];

let isEncryptMode = true;

function xorCipher(text, key) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}

function encodeText(text, key) {
    const encrypted = xorCipher(text, key);
    let emojiString = "";
    for (let char of encrypted) {
        const index = Math.abs(char.charCodeAt(0)) % emojiMap.length;
        emojiString += emojiMap[index];
    }
    return emojiString;
}

function decodeText(emojiString, key) {
    let encrypted = "";
    for (let emoji of [...emojiString]) {
        const index = emojiMap.indexOf(emoji);
        if (index === -1) continue;
        encrypted += String.fromCharCode(index);
    }
    return xorCipher(encrypted, key);
}

// Toggle functionality
function toggleMode() {
    isEncryptMode = !isEncryptMode;
    const toggleSwitch = document.getElementById('toggleSwitch');
    const toggleLabel = document.getElementById('toggleLabel');
    const input = document.getElementById('input');
    const actionBtn = document.getElementById('actionBtn');
    const output = document.getElementById('output');

    toggleSwitch.classList.toggle('active');

    if (isEncryptMode) {
        // Text -> Emoji
        toggleLabel.textContent = 'Text → Emojis';
        input.placeholder = 'Hello World or write some javascript code';
        document.querySelector('.input-group label').textContent = '1. Type a message';
        actionBtn.innerHTML = '🔐 Encrypt Text';
        output.placeholder = 'Encrypted emojis will appear here...';
    } else {
        // Emoji -> Text
        toggleLabel.textContent = 'Emojis → Text';
        input.placeholder = 'Paste encrypted emojis here';
        document.querySelector('.input-group label').textContent = '1. Paste encrypted emojis';
        actionBtn.innerHTML = '🔓 Decrypt Emojis';
        output.placeholder = 'Decrypted text will appear here...';
    }
}

// Action button
document.getElementById('actionBtn').onclick = () => {
    const input = document.getElementById('input').value;
    const key = document.getElementById('key').value;
    const output = document.getElementById('output');

    if (!input.trim()) return alert('Enter text/emojis first');
    if (!key.trim()) return alert('Enter secret key');

    try {
        let result;
        if (isEncryptMode) {
            result = encodeText(input, key);
        } else {
            result = decodeText(input, key);
        }

        output.value = result;
        navigator.clipboard.writeText(result);
        alert(`${isEncryptMode ? 'Encrypted' : 'Decrypted'}! (${emojiMap.length} emojis)\nCopied to clipboard.`);
    } catch (e) {
        alert('Operation failed. Check input and key.');
    }
};

// Toggle click handler
document.getElementById('toggleSwitch').onclick = toggleMode;
