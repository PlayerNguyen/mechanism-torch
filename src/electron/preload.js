const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  ping: () => ipcRenderer.invoke("ping"),
  toggleMaximize: () => ipcRenderer.invoke("toggleMaximize"),
  isDevelopment: !process.env.NODE_ENV
    ? false
    : process.env.NODE_ENV === "development",
});
