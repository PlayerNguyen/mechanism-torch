import { app } from "electron";
import { existsSync, mkdirSync } from "fs";
import path from "path";

/**
 * The source path
 */
export function getInternalAppPath(): string {
  const _ = app.getAppPath();
  return _.includes("dist/main") ? path.dirname(path.dirname(_)) : _;
}

/**
 * The path that launcher serve for storing Minecraft data
 * @return
 */
export function getLauncherPath() {
  return path.join(app.getPath("appData"), ".mtorch");
}

export function setupLauncherDirectory() {
  console.log(`Initializing launcher path: ${getLauncherPath()}`);

  if (!existsSync(getLauncherPath())) {
    console.log(`Launcher path not found, trying to create...`);
    mkdirSync(getLauncherPath(), { recursive: true });
  }
}

export function getConfigurationFilePath(): string {
  return path.join(getLauncherPath(), "Config.json");
}

export interface Storage {
  getValue(key: string): any;
  setValue(key: string, value: any): void;
  hasValue(key: string): boolean;

  saveTo(path: string): void;
}

export abstract class MemoryStorage implements Storage {
  private storage: Map<String, any> = new Map<String, any>();

  setValue(key: string, value: any) {
    return this.storage.set(key, value);
  }

  getValue(key: string) {
    return this.storage.get(key);
  }

  hasValue(key: string): boolean {
    return this.storage.has(key);
  }

  entries() {
    return this.storage.entries();
  }

  forEach(
    callbackFn: (value: any, key: String, map: Map<String, any>) => void,
    thisArg?: any
  ) {
    return this.storage.forEach(callbackFn, thisArg);
  }

  abstract saveTo(path: string): void;
}
