import { app, BrowserWindow } from "electron";
import { initManifestData } from "./assets/Asset";
import { getConfiguration } from "./configs/Configuration";
import { getConfigurationFilePath, setupLauncherDirectory } from "./utils/File";
import { createMainBrowserWindow } from "./Window";

(async () => {
  setupLauncherDirectory();
  const configuration = getConfiguration();
  await initManifestData();

  app.on("ready", async () => {
    let mainBrowser = createMainBrowserWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        mainBrowser = createMainBrowserWindow();
      }
    });

    app.on("before-quit", () => {
      // Save the configuration before quit application
      configuration.saveTo(getConfigurationFilePath());
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
})();
