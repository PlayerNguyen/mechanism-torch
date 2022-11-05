const packager = require("electron-packager");
const { buildApplication } = require("./utils/build");

async function packApplication() {
  packager({ dir: "./", out: "./out", asar: false, overwrite: true });
}

(async () => {
  await buildApplication();

  await packApplication();
})();
