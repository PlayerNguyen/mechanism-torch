import { app } from "electron";
import path from "path";

/**
 * The source path
 */
function getInternalAppPath(): string {
  const _ = app.getAppPath();
  return _.includes("dist/main") ? path.dirname(path.dirname(_)) : _;
}

export { getInternalAppPath };
