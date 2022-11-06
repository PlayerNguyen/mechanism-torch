import dns from "dns";
export function isDevelopment(): boolean {
  return !process.env.NODE_ENV ? false : process.env.NODE_ENV === "development";
}

export async function hasConnection(): Promise<boolean> {
  return new Promise<boolean>((res, rej) => {
    dns.resolve("www.google.com", (err) => {
      err ? res(false) : res(true);
    });
  });
}
