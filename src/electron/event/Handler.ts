import { ipcMain, BrowserWindow } from "electron";
interface Handler {
  channelId: string;
  onHandle: (...args: any[]) => any;
}

class ApplicationHandler {
  private handlerList: Handler[];
  private registeredId: Set<String> = new Set();
  private static handler: ApplicationHandler;

  constructor() {
    // this.window = window;
    this.handlerList = [];

    this.handlerList.push(new ToggleMaximizeHandler());
  }

  public register() {
    console.log(this.registeredId);
    // The function that register an application handler
    for (let value of this.handlerList) {
      if (!this.registeredId.has(value.channelId)) {
        console.log(`Registering handler ${value.channelId}`);
        ipcMain.handle(value.channelId, value.onHandle);
        this.registeredId.add(value.channelId);
      }
    }
  }

  public unregister() {
    for (let value of this.handlerList) {
      ipcMain.removeHandler(value.channelId);
      this.registeredId.delete(value.channelId);
    }
  }

  /**
   * Creates a new instance  of ApplicationHandler if it is not existed, otherwise just return it (Singleton).
   *
   * @returns a current instance of Application Handler
   */
  public static createHandler() {
    if (!ApplicationHandler.handler) {
      ApplicationHandler.handler = new ApplicationHandler();
    }
    return ApplicationHandler.handler;
  }
}

class ToggleMaximizeHandler implements Handler {
  channelId: string = "toggleMaximize";
  

  constructor() {}

  onHandle = () => {
    const _window = BrowserWindow.getFocusedWindow();
    if (_window === null) {
      throw new Error("Window is undefined or invalid");
    }

    !_window.isMaximized() ? _window.maximize() : _window.unmaximize();
  };
}

export default ApplicationHandler;
