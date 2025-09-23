import { splitUrl, getRandomString, hash } from "../utils";

const GenTypeAUrl = function (
  url: string,
  key: string,
  signName: string,
  uid: string,
  ts: number,
  algorithm: string
): string {
  const params = splitUrl(url);
  const scheme = params[0],
    host = params[1],
    path = params[2],
    args = params[3];
  const randstr = getRandomString(10);
  const text = `${path}-${ts}-${randstr}-${uid}-${key}`;
  const hashVal = hash(algorithm, text);
  const authArg = `${signName}=${ts}-${randstr}-${uid}-${hashVal}`;
  if (!args) {
    return `${scheme}${host}${path}?${authArg}`;
  } else {
    return `${scheme}${host}${path}${args}&${authArg}`;
  }
};

export default GenTypeAUrl;
