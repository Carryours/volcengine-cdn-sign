import { formatDate, hash, splitUrl } from "../utils";

const GenTypeBUrl = function (
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
};

export default GenTypeBUrl;
