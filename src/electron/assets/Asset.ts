import { existsSync, mkdirSync } from "fs";
import { getManifestFilePath } from "../utils/File";
import path from "path";
import { hasConnection } from "../utils/Environment";
import { download } from "../utils/Download";

interface Asset {}

class ManifestInterceptor {}

export async function initManifestData() {
  // Check if directory was created
  const dir = path.dirname(getManifestFilePath());
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  // No connection
  if (!(await hasConnection())) {
    // Then check if file is existed or not
    if (!existsSync(getManifestFilePath())) {
      throw new Error("No connection and manifest found");
    }
  }

  // Always update the manifest file
  download(
    "https://avatars.githubusercontent.com/u/10703461?s=40&v=4",
    {} as RequestInit
  ).then(async (response) => {
    const buffer = await response.buffer();

    console.log(buffer);
  });
}
