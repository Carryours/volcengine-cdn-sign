import { describe, it, expect } from "vitest";
import {
  GenTypeAUrl,
  GenTypeBUrl,
  GenTypeCUrl,
  GenTypeDUrl,
  GenTypeEUrl,
} from "./index";

describe("CDN签名URL生成", () => {
  const url =
    "https://image-cdn-test.tuchong.com/weili/sm/2353676296380219401.webp";
  const key = "tuchong123";
  const ts = Math.floor(Date.now() / 1000); // 当前时间戳（秒）
  const algorithm = "md5";

  // 正常加密
  it("正常加密", async () => {
    const result = GenTypeCUrl(url, key, ts, algorithm);
    console.log(result);
    await fetch(result).then((res) => {
      expect(res.status).toBe(200);
    });
  });

  // 算法不匹配
  it("算法不匹配", async () => {
    const result = GenTypeCUrl(url, key, ts, "sha256");
    await fetch(result).then((res) => {
      expect(res.status).toBe(403);
      res.text().then((reason) => {
        expect(reason).toBe("check sign failed");
      });
    });
  });

  // 时间戳过期
  it("时间戳过期", async () => {
    const result = GenTypeCUrl(url, key, ts - 2000, "md5");
    await fetch(result).then((res) => {
      expect(res.status).toBe(403);
      res.text().then((reason) => {
        expect(reason).toBe("time expire");
      });
    });
  });

  // 时间戳过期
  it("Key不对", async () => {
    const result = GenTypeCUrl(url, "123321", ts, "md5");
    await fetch(result).then((res) => {
      expect(res.status).toBe(403);
      res.text().then((reason) => {
        expect(reason).toBe("check sign failed");
      });
    });
  });
});
