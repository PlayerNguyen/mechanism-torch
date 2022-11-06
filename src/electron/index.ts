import { app, BrowserWindow } from "electron";
import { getConfiguration } from "./config/Configuration";
import { setupLauncherDirectory } from "./utils/File";
import { createMainBrowserWindow } from "./Window";

(async () => {
  setupLauncherDirectory();

  app.on("ready", async () => {
    const _w = createMainBrowserWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createMainBrowserWindow();
      }
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
})();
