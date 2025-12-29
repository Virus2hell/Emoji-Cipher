const emojiMap = [
  // Faces (original 38)
  "😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊",
  "😋","😎","😍","😘","🥰","😗","😙","😚","🙂","🤗",
  "🤩","🤔","🤨","😐","😑","😶","🙄","😏","😣","😥",
  "😮","🤐","😯","😪","😫","🥱","😴","😌","😛","😜",
  
  // Animals & Birds (40+)
  "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯",
  "🦁","🐮","🐷","🐽","🐸","🐵","🙈","🙉","🙊","🐒",
  "🐔","🐧","🐦","🐤","🐣","🐥","🦆","🦅","🦉","🦇",
  "🐺","🐗","🐴","🦓","🦌","🐭","🐁","🐀","🐿️","🦔",
  
  // Fruits (20+)
  "🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍈",
  "🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑","🥦",
  
  // Vegetables (15+)
  "🥬","🥒","🌶️","🫑","🥕","🌽","🥔","🍠","🫚","🧄",
  "🧅","🥜","🌰","🫘","🍄","🫐"
];

function xorCipher(text, key) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
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

// Encode functionality
document.getElementById("encode").onclick = () => {
  const text = document.getElementById("input").value;
  const key = document.getElementById("key").value;
  if (!text.trim()) return alert("Enter a message to encrypt");
  if (!key.trim()) return alert("Enter secret key");
  
  try {
    const result = encodeText(text, key);
    navigator.clipboard.writeText(result).then(() => {
      document.getElementById("input").value = result;
      alert(`Encrypted! (${emojiMap.length} emojis available)\nCopied to clipboard.`);
    });
  } catch (e) {
    alert("Encryption failed. Try a different key.");
  }
};

// Decode functionality  
document.getElementById("decode").onclick = () => {
  const emojiString = document.getElementById("decryptInput").value;
  const key = document.getElementById("decryptKey").value;
  
  if (!emojiString.trim()) return alert("Paste encrypted emojis");
  if (!key.trim()) return alert("Enter secret key");
  
  try {
    const result = decodeText(emojiString, key);
    navigator.clipboard.writeText(result).then(() => {
      document.getElementById("decryptInput").value = result;
      alert(`Decrypted! (${emojiMap.length} emojis supported)\nCopied to clipboard.`);
    });
  } catch (e) {
    alert("Decryption failed. Check key or emoji string.");
  }
};
