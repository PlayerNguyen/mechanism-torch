const packager = require("electron-packager");
const { buildApplication } = require("./utils/build");

async function packApplication() {
  packager({
    dir: "./",
    out: "./out",
    asar: false,
    overwrite: true,
    ignore: [
      ".parcel-cache",
      "scripts",
      ".gitignore",
      ".postcssrc",
      "tailwind.config.js",
      "tsconfig.json",
      ".git",
    ],
  });
}

(async () => {
  await buildApplication();

  await packApplication();
})();
