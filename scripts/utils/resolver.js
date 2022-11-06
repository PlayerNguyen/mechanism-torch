import chalk from "chalk";

function visibleDiagnostics(diagnostics, prefix) {
  prefix = prefix === undefined ? "Builder" : prefix;

  diagnostics.forEach((diagnostic) => {
    // Describe error detail
    console.error(`[✈][${prefix}] ${chalk.red(diagnostic.message)}`);

    // Describe hint
    if (diagnostic.hints) {
      diagnostic.hints.forEach((hint) => {
        console.log(`💡 ${chalk.yellow(hint)}`);
      });
    }
  });
}

export { visibleDiagnostics };
