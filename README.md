# cdn-sign

用于生成带签名的 CDN 链接的 TypeScript 工具包。

## 安装

```bash
npm install cdn-sign
```

## 使用示例

```typescript
import { GenTypeEUrl } from 'cdn-sign';

const url = 'https://example.com/path/to/file?foo=bar';
const key = 'your_secret_key';
const signName = 'sign';
tsName = 't';
const ts = Math.floor(Date.now() / 1000);
const base = 10;
const algorithm = 'md5';

const signedUrl = GenTypeEUrl(url, key, signName, tsName, ts, base, algorithm);
console.log(signedUrl);
```

## 支持的 hash 算法
- md5
- sha1
- sha256
