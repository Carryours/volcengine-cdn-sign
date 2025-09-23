import { hash, splitUrl } from "../utils";

const GenTypeEUrl = function (
  url: string,
  key: string,
  signName: string,
  tsName: string,
  ts: number,
  base: number,
  algorithm: string
): string {
  const params = splitUrl(url);
  const scheme = params[0],
    domain = params[1],
    uri = params[2],
    args = params[3];
  const tsStr = ts.toString(base);
  const text = `${key}${domain}${uri}${tsStr}`;
  const hashVal = hash(algorithm, text);
  const authArg = `${signName}=${hashVal}&${tsName}=${tsStr}`;
  if (!args) {
    return `${scheme}${domain}${uri}?${authArg}`;
  } else {
    return `${scheme}${domain}${uri}${args}&${authArg}`;
  }
};

export default GenTypeEUrl;
