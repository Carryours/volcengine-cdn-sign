import { hash, splitUrl } from "../utils";

const GenTypeDUrl = function (
  url: string,
  key: string,
  signName: string,
  timeName: string,
  ts: number,
  base: number,
  algorithm: string
): string {
  const params = splitUrl(url);
  const scheme = params[0],
    host = params[1],
    path = params[2],
    args = params[3];
  const tsStr = ts.toString(base);
  const text = `${key}${path}${tsStr}`;
  const hashVal = hash(algorithm, text);
  const authArg = `${signName}=${hashVal}&${timeName}=${tsStr}`;
  if (!args) {
    return `${scheme}${host}${path}?${authArg}`;
  } else {
    return `${scheme}${host}${path}${args}&${authArg}`;
  }
};

export default GenTypeDUrl;
