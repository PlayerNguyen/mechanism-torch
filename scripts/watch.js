import { Parcel } from "@parcel/core";
import chalk from "chalk";
import { spawnElectron } from "./start-electron.js";
import { cleanUpBuild } from "./utils/build.js";
import { visibleDiagnostics } from "./utils/resolver.js";

let renderBundler = new Parcel({
  entries: "./src/render/index.html",
  defaultConfig: "@parcel/config-default",
  targets: ["render"],
  serveOptions: {
    port: 1234,
  },
  hmrOptions: {
    port: 1234,
  },

  shouldDisableCache: true,
});

let mainBundler = new Parcel({
  entries: "./src/electron/index.ts",
  defaultConfig: "@parcel/config-default",
  targets: ["main"],

  shouldDisableCache: true,
});

(async () => {
  // Must clean all things
  await cleanUpBuild();

  let isMainStartWorking = false;
  /**
   * @type {process}
   */
  let lastProcess;

  await renderBundler.watch((error, buildEvent) => {
    // catch any error
    if (error) {
      console.error(chalk.red(error.stack));
      throw error;
    }

    if (buildEvent.type === "buildFailure") {
      // console.log(buildEvent.diagnostics);
      visibleDiagnostics(buildEvent.diagnostics);
    }

    // If the build was success
    if (buildEvent.type === "buildSuccess") {
      const bundles = buildEvent.bundleGraph.getBundles();

      // console.clear();
      console.log(
        chalk.bold(
          chalk.green(
            `✨ [Front] Completely bundling ${chalk.yellow(
              bundles.length
            )} asset(s) in ${chalk.blue(buildEvent.buildTime / 1000)} s`
          )
        )
      );

      if (isMainStartWorking) {
        // console.log(`Press [Cmd + R] or [F5] to view on client-side`);
      }

      return;
    }
  });

  // Build main app and start
  mainBundler.watch(async (err, e) => {
    // catch any error
    if (err) {
      console.error(chalk.red(err.stack));
      throw err;
    }

    if (e.type === "buildFailure") {
      visibleDiagnostics(e.diagnostics);
    }

    if (e.type === "buildSuccess") {
      const _process = await spawnElectron();

      if (!isMainStartWorking) isMainStartWorking = true;
      else process.kill(lastProcess.pid); // Kill the process if it is currently working

      lastProcess = _process; // Set the last process for caching
    }
  });
})();
