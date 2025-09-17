import CryptoJS from 'crypto-js';

function splitUrl(url: string): [string, string, string, string] {
  const match = url.match(/^(https?:\/\/)([^\/]+)([^?]*)(\?.*)?$/);
  if (!match) throw new Error('URL 格式不正确');
  return [match[1], match[2], match[3], match[4] ? match[4] : ''];
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

export function GenTypeAUrl(
  url: string,
  key: string,
  signName: string,
  uid: string,
  ts: number,
  algorithm: string
): string {
  const params = splitUrl(url);
  const scheme = params[0], host = params[1], path = params[2], args = params[3];
  const randstr = getRandomString(10);
  const text = `${path}-${ts}-${randstr}-${uid}-${key}`;
  const hashVal = hash(algorithm, text);
  const authArg = `${signName}=${ts}-${randstr}-${uid}-${hashVal}`;
  if (!args) {
    return `${scheme}${host}${path}?${authArg}`;
  } else {
    return `${scheme}${host}${path}${args}&${authArg}`;
  }
}

export function GenTypeBUrl(
  url: string,
  key: string,
  ts: number,
  algorithm: string
): string {
  const params = splitUrl(url);
  const scheme = params[0], host = params[1], path = params[2], args = params[3];
  const tsStr = formatDate(ts);
  const text = `${key}${tsStr}${path}`;
  const hashVal = hash(algorithm, text);
  return `${scheme}${host}/${tsStr}/${hashVal}${path}${args ? args : ''}`;
}

export function GenTypeCUrl(
  url: string,
  key: string,
  ts: number,
  algorithm: string
): string {
  const params = splitUrl(url);
  const scheme = params[0], host = params[1], path = params[2], args = params[3];
  const tsStr = ts.toString(16);
  const text = `${key}${path}${tsStr}`;
  const hashVal = hash(algorithm, text);
  return `${scheme}${host}/${hashVal}/${tsStr}${path}${args ? args : ''}`;
}

export function GenTypeDUrl(
  url: string,
  key: string,
  signName: string,
  timeName: string,
  ts: number,
  base: number,
  algorithm: string
): string {
  const params = splitUrl(url);
  const scheme = params[0], host = params[1], path = params[2], args = params[3];
  const tsStr = ts.toString(base);
  const text = `${key}${path}${tsStr}`;
  const hashVal = hash(algorithm, text);
  const authArg = `${signName}=${hashVal}&${timeName}=${tsStr}`;
  if (!args) {
    return `${scheme}${host}${path}?${authArg}`;
  } else {
    return `${scheme}${host}${path}${args}&${authArg}`;
  }
}

export function GenTypeEUrl(
  url: string,
  key: string,
  signName: string,
  tsName: string,
  ts: number,
  base: number,
  algorithm: string
): string {
  const params = splitUrl(url);
  const scheme = params[0], domain = params[1], uri = params[2], args = params[3];
  const tsStr = ts.toString(base);
  const text = `${key}${domain}${uri}${tsStr}`;
  const hashVal = hash(algorithm, text);
  const authArg = `${signName}=${hashVal}&${tsName}=${tsStr}`;
  if (!args) {
    return `${scheme}${domain}${uri}?${authArg}`;
  } else {
    return `${scheme}${domain}${uri}${args}&${authArg}`;
  }
}
