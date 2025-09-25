import { describe, it, expect } from 'vitest';

describe('demo test', () => {
  it('test icphoto image', async () => {
    const url = 'https://static-prod.ituchong.com/tc-common-fe-static/others/news/obj/eden-cn/aonpyfwvj_lcpahlyj_kh/ljhwZthlaukjlkulzlp/icphoto/IC%E5%87%BA%E7%89%88%E7%89%A9%E7%BB%8F%E8%90%A5%E8%AE%B8%E5%8F%AF%E8%AF%81.jpeg';
    await fetch(url).then(res => {
      console.log(res.status)
      const contentLength = res.headers.get('Content-Length');
      expect(contentLength).not.toBe("5142171");
    });
  });
});