const fetch = require("node-fetch");

export async function download(url: string, options?: RequestInit | any) {
  // return fetch(url, options);
  return fetch(url, options);
}
