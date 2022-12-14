import stream from "stream";
import { existsSync, mkdirSync } from "fs";
import { getManifestFilePath, getProfileFilePath } from "../utils/File";
import { hasConnection, isDevelopment } from "../utils/Environment";
import { download, downloadIntoDestination } from "../utils/Download";
import path from "path";
import fs from "fs";
import { Import } from "../Import";
import { JsonInterceptor, JsonSerializable } from "./Interceptor";
import { LauncherProfile } from "./Profile";

interface Asset {}

export async function initializeVersionManifest() {
  // Check if directory was created
  const dir = path.dirname(getManifestFilePath());

  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  // Debug connection test

  // No connection
  if (!(await hasConnection())) {
    // Then check if file is existed or not
    if (!existsSync(getManifestFilePath())) {
      throw new Error("No connection and manifest found");
    }

    // Set the manifest file into global version
    GlobalVersionManifest.getInstance().setManifest(
      await ManifestInterceptor.read()
    );

    // console.log(GlobalVersionManifest.getInstance().getManifest());

    return;
  }

  const response = await downloadIntoDestination(
    Import.MINECRAFT_VERSION_MANIFEST_URL,
    getManifestFilePath()
  );

  // Set the manifest to global data
  GlobalVersionManifest.getInstance().setManifest(await response.json());
}

class ManifestInterceptor {
  /**
   * Read a manifest version file from disk (IO) using pipeline stream.
   *
   * @returns a promise resolve when the ReadableStream was end. Reject when error occurred
   */
  static read(): Promise<MinecraftVersionManifestResponse> {
    return new Promise((resolve, reject) => {
      // Read stream using pipelining
      const manifestDataStream = fs.createReadStream(getManifestFilePath());

      // Reject the promise if occur an error
      manifestDataStream.on("error", reject);

      let build = ""; // Set into memory
      manifestDataStream.on("data", (chunk) => {
        isDevelopment() &&
          console.log(
            `[Asset::ManifestInterceptor] Piping version manifest data; ${chunk.length} byte(s)`
          );
        build += chunk;
      });

      manifestDataStream.on("close", () => {
        resolve(JSON.parse(build));
      });
    });
  }

  static write(buffer: stream.Writable) {
    return new Promise<void>((resolve, reject) => {
      // Write a stream into path
      const pipe = buffer.pipe(fs.createWriteStream(getManifestFilePath()));
      // Reject on error occurred
      pipe.on("error", reject);
      pipe.on("finish", () => {
        resolve();
      });
    });
  }
}

interface MinecraftVersionManifestVersionNode {
  id: string;
  type: "snapshot" | "release";
  url: string;
  time: Date;
  releaseTime: Date;
  sha1: string;
  complianceLevel: 1 | 0;
}
interface MinecraftVersionManifestLatest {
  release: string;
  snapshot: string;
}
interface MinecraftVersionManifestResponse {
  latest: MinecraftVersionManifestLatest;
  versions: MinecraftVersionManifestVersionNode[];
}

/**
 * Runtime only version manifest object.
 * Used for cache manifest data as a global, using singleton pattern.
 */
export class GlobalVersionManifest {
  private static instance: GlobalVersionManifest;
  private manifest?: MinecraftVersionManifestResponse;

  constructor() {}

  setManifest(manifest: MinecraftVersionManifestResponse) {
    const { release, snapshot } = manifest.latest;

    console.log(
      `Loaded version manifest with ${JSON.stringify({
        release,
        snapshot,
      })} and ${manifest.versions.length} versions`
    );
    this.manifest = manifest;
  }

  getManifest() {
    return this.manifest;
  }

  public static getInstance() {
    if (this.instance == null || this.instance == undefined) {
      this.instance = new GlobalVersionManifest();
    }
    return this.instance;
  }
}

export async function initializeProfile() {
  if (!fs.existsSync(getProfileFilePath())) {
    const latestReleaseMinecraftVersion =
      GlobalVersionManifest.getInstance().getManifest()?.latest.release;

    if (!latestReleaseMinecraftVersion) {
      throw new Error("Manifest not found");
    }

    await LauncherProfile.getInstance().loadDefault(
      latestReleaseMinecraftVersion
    );
    return;
  }

  // Load the profile from local storage
  await LauncherProfile.getInstance().load();
}
