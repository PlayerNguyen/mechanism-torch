import path from "path";
import { BrowserWindow } from "electron";
import { isDevelopment } from "./utils/Environment";
import { getInternalAppPath } from "./utils/File";
import ApplicationHandler from "./events/Handler";

let applicationHandler: ApplicationHandler = ApplicationHandler.createHandler();
export class MainBrowserWindow extends BrowserWindow {
  constructor(...options: any) {
    super({ ...options });
  }
}

export class LoadingBrowserWindow extends BrowserWindow {
  constructor(...options: any) {
    super({
      width: 400,
      height: 600,
      frame: false,
      webPreferences: {
        preload: path.resolve(
          getInternalAppPath(),
          "src",
          "electron",
          "preload.js"
        ),
      },
      ...options,
    });
  }
}

function setGlobalOptionsWindows(window: BrowserWindow) {
  isDevelopment() && window.webContents.openDevTools({ mode: "undocked" });
}

export function createLoadingWindow() {
  const _window = new LoadingBrowserWindow();

  isDevelopment()
    ? _window.loadURL(`http://localhost:1234/dev`)
    : _window.loadFile(
        path.resolve(getInternalAppPath(), "dist", "render", "index.html")
      );

  setGlobalOptionsWindows(_window);

  return _window;
}

export function createMainBrowserWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: "hidden",

    trafficLightPosition: {
      x: 6,
      y: 12.5,
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

  applicationHandler.register();

  window.on("close", () => {
    applicationHandler.unregister();
  });

  // Load the url or file
  isDevelopment()
    ? window.loadURL("http://localhost:1234")
    : window.loadFile(
        path.resolve(getInternalAppPath(), "dist", "render", "index.html")
      );

  return window;
}
