export function getRandomChars(length = 10) {
  let res = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++ ) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    res += characters.charAt(randomIndex);
  }
  return res;
}