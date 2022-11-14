import { app, BrowserWindow } from "electron";
import { initializeProfile, initializeVersionManifest } from "./assets/Asset";
import { getConfiguration } from "./configs/Configuration";
import { setupLauncherDirectory } from "./utils/File";
import { createMainBrowserWindow } from "./Window";

function initializeApplication() {
  app.on("ready", async () => {
    setupLauncherDirectory();
    const configuration = getConfiguration();
    await initializeVersionManifest();
    await initializeProfile();

    let mainBrowser = createMainBrowserWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        mainBrowser = createMainBrowserWindow();
      }
    });

    app.on("before-quit", () => {
      // Save the configuration before quit application
      // configuration.saveTo(getConfigurationFilePath());
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
}

initializeApplication();
