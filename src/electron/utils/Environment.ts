export function isDevelopment(): boolean {
  return !process.env.NODE_ENV ? false : process.env.NODE_ENV === "development";
}
