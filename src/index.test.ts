import { describe, it, expect } from 'vitest';
import { GenTypeAUrl, GenTypeBUrl, GenTypeCUrl, GenTypeDUrl, GenTypeEUrl } from './index';

describe('CDN签名URL生成', () => {
  const url = 'https://image-cdn-test.tuchong.com/weili/sm/2353676296380219401.webp';
  const key = 'tuchong123';
  // const signName = 'sign';
  // const tsName = 't';
  // const timeName = 't';
  // const uid = '123';
  const ts = Math.floor(Date.now() / 1000); // 当前时间戳（秒）
  // const base = 10;
  const algorithm = 'md5';

  // it('GenTypeAUrl', () => {
  //   const result = GenTypeAUrl(url, key, signName, uid, ts, algorithm);
  //   expect(result).toContain('sign=');
  //   expect(result).toContain(uid);
  // });

  // it('GenTypeBUrl', () => {
  //   const result = GenTypeBUrl(url, key, ts, algorithm);
  //   expect(result).toContain('/');
  //   expect(result).toContain('test.com');
  // });

  it('GenTypeCUrl', async () => {
    const result = GenTypeCUrl(url, key, ts, algorithm);
    console.log(result)
    await fetch(result).then(res => {
      console.log(res.status)
      expect(res.status).toBe(200);
    })
    // expect(result).toContain('test.com');
  });

  // it('GenTypeDUrl', () => {
  //   const result = GenTypeDUrl(url, key, signName, timeName, ts, base, algorithm);
  //   expect(result).toContain(signName + '=');
  //   expect(result).toContain(timeName + '=');
  // });

  // it('GenTypeEUrl', () => {
  //   const result = GenTypeEUrl(url, key, signName, tsName, ts, base, algorithm);
  //   expect(result).toContain(signName + '=');
  //   expect(result).toContain(tsName + '=');
  // });
});
