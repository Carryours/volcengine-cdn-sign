# cdn-sign

用于生成带签名的 CDN 链接的 TypeScript 工具包。

## 安装

```bash
npm install @tuchong/volcengine-cdn-sign
```

## 使用示例

```typescript
import { GenTypeCUrl } from '@tuchong/volcengine-cdn-sign';

const url = 'https://example.com/path/to/file?foo=bar';
const key = 'your_secret_key';
const ts = Math.floor(Date.now() / 1000);
const algorithm = 'md5';

const signedUrl = GenTypeCUrl(url, key, ts, algorithm);
console.log(signedUrl);
```

## 支持的 hash 算法
- md5
- sha256
