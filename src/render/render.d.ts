export interface IElectronAPI {
  toggleMaximize: () => Promise<void>;
}

declare global {
  interface Window {
    api: IElectronAPI;
  }
}
