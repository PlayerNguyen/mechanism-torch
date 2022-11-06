import { existsSync, writeFileSync, readFileSync } from "fs";
import { getConfigurationFilePath, MemoryStorage } from "../utils/File";

const DefaultConfiguration = {
  CurrentTheme: "default",
};

export class ConfigurationProvider extends MemoryStorage {
  constructor() {
    super();
    // Read configuration and read as hash map
    // If not found, create a default configuration
    if (!this.hasConfigurationFile()) {
      this.loadDefaultConfiguration();
      // Then save to the configuration file
      this.saveTo(getConfigurationFilePath());
    } else {
      this.loadConfiguration();
    }
  }

  private loadDefaultConfiguration() {
    console.log(`Loading default configuration`);

    let propertyName: keyof typeof DefaultConfiguration;
    for (propertyName in DefaultConfiguration) {
      this.setValue(propertyName, DefaultConfiguration[propertyName]);
    }
  }

  private loadConfiguration() {
    console.log(`Loading / Storing configuration into memory ...`);

    const outputOfJsonFile = readFileSync(
      getConfigurationFilePath()
    ).toString();
    const _outputAsJson = JSON.parse(outputOfJsonFile);

    for (let propertyName in _outputAsJson) {
      this.setValue(propertyName, _outputAsJson[propertyName]);
    }
  }

  public saveTo(path: string): void {
    let _obj = {};
    this.forEach((value, key) => {
      // @ts-ignore
      _obj[key] = value;
    });

    writeFileSync(path, JSON.stringify(_obj));
  }

  public hasConfigurationFile(): boolean {
    return existsSync(getConfigurationFilePath());
  }

  // singleton instance
  private static configurationInterceptor: ConfigurationProvider;
  static getInstance(): ConfigurationProvider {
    if (
      this.configurationInterceptor === null ||
      this.configurationInterceptor === undefined
    ) {
      this.configurationInterceptor = new ConfigurationProvider();
    }
    return this.configurationInterceptor;
  }
}

const config: ConfigurationProvider = ConfigurationProvider.getInstance();

export function getConfiguration(): ConfigurationProvider {
  return config;
}
