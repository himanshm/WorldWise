// char.charCodeAt(): This gives you the Unicode code point for a character. For uppercase letters 'A' to 'Z', the code points range from 65 to 90.
// 127397: This fixed offset is where the regional indicator symbols (used to form flag emojis) start within the Unicode character set.

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// This function takes a country code as input and returns the corresponding flag emoji.
export function getFlagEmoji(countryCode: string): string {
  // First, we need to convert the country code to uppercase.
  countryCode = countryCode.toUpperCase();

  // Next, we need to split the country code into two characters.
  const countryCodeChars = countryCode.split('');

  // Now, we need to convert each character to its corresponding Unicode code point.
  const unicodeCodePoints = countryCodeChars.map((char) => char.charCodeAt(0));

  // Finally, we need to add 127397 to each Unicode code point to get the corresponding flag emoji.
  const flagEmojis = unicodeCodePoints.map((codePoint) =>
    String.fromCodePoint(codePoint + 127397)
  );

  // We return the flag emojis joined together as a single string.
  return flagEmojis.join('');
}
