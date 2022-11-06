import chalk from "chalk";
import { spawn } from "child_process";
import { existsSync } from "fs";
import path from "path";

function getElectronPath() {
  return path.join(
    process.cwd(),
    "node_modules",
    "electron",
    "dist",
    "Electron.app",
    "Contents",
    "MacOS",
    "Electron"
  );
}

async function spawnElectron() {
  console.log(`spawning electron application`);
  // Check if the electron was installed
  if (!existsSync("node_modules/electron")) {
    throw new Error(
      "Electron modules was not installed, might use: (npm/yarn) install or install electron directly"
    );
  }

  // Start from node_modules
  const _process = spawn(getElectronPath(), ["./dist/main/index.js"], {
    // shell: true,
    stdio: ["ignore", "inherit", "inherit"],
    // Pass environment
    env: { ...process.env },
  });

  // Other stuffs like debugging, logging system,..
  return _process;
}

export { spawnElectron };
