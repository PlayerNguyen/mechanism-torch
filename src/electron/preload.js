const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  ping: () => ipcRenderer.invoke("ping"),
  toggleMaximize: () => ipcRenderer.invoke("toggleMaximize"),
});
