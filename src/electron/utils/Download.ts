export async function download(url: string, options?: RequestInit | any) {
  // return fetch(url, options);
  const fetch = await import("node-fetch");
  fetch.default(url, options);
}
