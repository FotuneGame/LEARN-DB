


export function generateRandomString(length:number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: length }, () => {
      return characters.charAt(Math.floor(Math.random() * characters.length));
    }).join('');
}