// const { Parcel } = require("@parcel/core");
// const chalk = require("chalk");
const chalk = require("chalk");
const { rmSync } = require("fs");
const { visibleDiagnostics } = require("./resolver");
const { Parcel } = require("@parcel/core");

let renderBundler = new Parcel({
  entries: "./src/render/index.html",
  defaultConfig: "@parcel/config-default",
  targets: ["render"],
  shouldDisableCache: true,
});

let mainBundler = new Parcel({
  entries: "./src/electron/index.ts",
  defaultConfig: "@parcel/config-default",
  targets: ["main"],
  shouldDisableCache: true,
});

async function bundle(parcel, name) {
  try {
    let { bundleGraph, buildTime } = await parcel.run();
    let bundles = bundleGraph.getBundles();
    console.log(
      chalk.bold(
        chalk.green(
          `✨ Completely bundling ${name} module ${chalk.yellow(
            bundles.length
          )} asset(s) in ${chalk.blue(buildTime / 1000)} s`
        )
      )
    );
  } catch (err) {
    console.error(err.diagnostics);
    throw err;
  }
}

async function cleanUpBuild() {
  const cleanUpDirectories = ["dist", ".parcel-cache"];
  cleanUpDirectories.forEach((e) => {
    rmSync(e, { force: true, recursive: true });
  });
}

async function buildApplication() {
  // Clean up the dist before build
  cleanUpBuild();

  try {
    await bundle(renderBundler, "render");

    await bundle(mainBundler, "main");
  } catch (err) {
    console.log(err.stack);
    if (err.diagnostics) {
      visibleDiagnostics(err.diagnostics);
    }
  }
}

module.exports = { buildApplication, cleanUpBuild };
