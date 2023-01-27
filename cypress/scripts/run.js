const {executeCommand, ensureDirExists} = require('@blueriq-tools/build-utils');

executeCommand({
  run: async context => {
    const host = context.args[0];
    const spec = context.args[1];

    await ensureDirExists('cypress/report/mochareports');
    try {
      await context.runner.exec(`cypress run --config baseUrl=http://${host}:9081  --spec ${spec} --browser chrome`)
    } finally {
      const oldCode = process.exitCode
      await context.runner.exec(`yarn e2e:reporting`);
      process.exitCode = oldCode;
    }
  },
})
