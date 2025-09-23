import { hash, splitUrl } from "../utils";

const GenTypeCUrl = function (
  url: string,
  key: string,
  ts: number,
  algorithm: string
): string {
  const defaultTs = Math.floor(Date.now() / 1000);
  const params = splitUrl(url);
  const scheme = params[0],
    host = params[1],
    path = params[2],
    args = params[3];
  const tsStr = ts ? ts.toString(16) : defaultTs.toString(16);
  const text = `${key}${path}${tsStr}`;
  const hashVal = hash(algorithm, text);
  return `${scheme}${host}/${hashVal}/${tsStr}${path}${args ? args : ""}`;
};

export default GenTypeCUrl;
