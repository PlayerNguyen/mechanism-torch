import { spawnElectron } from "./start-electron";

(async () => {
  try {
    // Run electron app (spawn a child_process)
    await spawnElectron();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
