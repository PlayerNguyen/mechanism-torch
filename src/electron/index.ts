import { app, BrowserWindow, ipcMain } from "electron";
import { isDevelopment } from "./utils/Environment";
import path from "path";
import { getInternalAppPath } from "./utils/File";

function createBrowserWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: "hidden",

    trafficLightPosition: {
      x: 6,
      y: 6,
    },

    webPreferences: {
      devTools: true,
      preload: path.resolve(
        getInternalAppPath(),
        "src",
        "electron",
        "preload.js"
      ),
    },
  });

  window.setTitle("Mechanism Torch");
  ipcMain.handle(`ping`, () => {
    console.log(`ping from browser`);
  });
  // Load the url or file
  isDevelopment()
    ? window.loadURL("http://localhost:1234")
    : window.loadFile(
        path.resolve(getInternalAppPath(), "dist", "render", "index.html")
      );

  return window;
}

app.on("ready", () => {
  const window = createBrowserWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createBrowserWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
