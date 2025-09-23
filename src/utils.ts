import CryptoJS from 'crypto-js';

function splitUrl(url: string): [string, string, string, string] {
  const match = url.match(/^(https?:)?\/\/([^\/]+)([^?]*)(\?.*)?$/);
  if (!match) throw new Error('URL 格式不正确');
  return [match[1] ? `${match[1]}//` : '//', match[2], match[3], match[4] ? match[4] : ''];
}

function hash(algorithm: string, text: string): string {
  switch (algorithm.toLowerCase()) {
    case 'md5':
      return CryptoJS.MD5(text).toString(CryptoJS.enc.Hex);
    case 'sha1':
      return CryptoJS.SHA1(text).toString(CryptoJS.enc.Hex);
    case 'sha256':
      return CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
    default:
      throw new Error('不支持的 hash 算法: ' + algorithm);
  }
}

function getRandomString(length: number): string {
  const arr = new Uint8Array(length);
  if (typeof window === 'undefined') {
    // Node.js
    require('crypto').randomFillSync(arr);
  } else {
    window.crypto.getRandomValues(arr);
  }
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, length);
}

function formatDate(ts: number): string {
  // Go: time.Unix(ts, 0).Format("200601021504")
  const d = new Date(ts * 1000);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return (
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    pad(d.getHours()) +
    pad(d.getMinutes())
  );
}

export { splitUrl, hash, getRandomString, formatDate };