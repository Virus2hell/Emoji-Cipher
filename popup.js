const emojiMap = [
  "😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊",
  "😋","😎","😍","😘","🥰","😗","😙","😚","🙂","🤗",
  "🤩","🤔","🤨","😐","😑","😶","🙄","😏","😣",
  "😥","😮","🤐","😯","😪","😫","🥱","😴","😌"
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
    const index = char.charCodeAt(0) % emojiMap.length;
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

document.getElementById("encode").onclick = () => {
  const text = document.getElementById("input").value;
  const key = document.getElementById("key").value;
  if (!key) return alert("Enter secret key");
  document.getElementById("output").value = encodeText(text, key);
};

document.getElementById("decode").onclick = () => {
  const text = document.getElementById("input").value;
  const key = document.getElementById("key").value;
  if (!key) return alert("Enter secret key");
  document.getElementById("output").value = decodeText(text, key);
};
