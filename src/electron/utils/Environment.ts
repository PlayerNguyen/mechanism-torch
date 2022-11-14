import dns from "dns";
export function isDevelopment(): boolean {
  return !process.env.NODE_ENV ? false : process.env.NODE_ENV === "development";
}

export async function hasConnection(): Promise<boolean> {
  return new Promise<boolean>((res) => {
    dns.resolve("www.google.com", (err) => {
      // Debug stdout
      isDevelopment() &&
        console.log(`[Environment::hasConnection] Debug connection `, {
          connection: err !== null || err !== undefined ? true : false,
        });
      // console.log(err);
      // Resolve the promise
      res(err !== null || err !== undefined ? true : false);
    });
  });
}
