// char.charCodeAt(): This gives you the Unicode code point for a character. For uppercase letters 'A' to 'Z', the code points range from 65 to 90.
// 127397: This fixed offset is where the regional indicator symbols (used to form flag emojis) start within the Unicode character set.

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127365 + char.charCodeAt(0) - 65); // Offset calculation
  return String.fromCodePoint(...codePoints);
}
