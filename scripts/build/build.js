const buildUtils = require('@blueriq-tools/build-utils');
const fs = require('fs');

buildUtils.executeCommand({
  build: async context => {

    const args = buildUtils.parseArgs(context.args, {
      isRelease: buildUtils.optionalBoolean(false)
    });

    // create all output paths to avoid errors when writing to these paths and when copying from the docker container
    buildUtils.ensureDirExists('dist');

    await context.runner.exec('node -v');
    await context.runner.exec('yarn -v');

    if (args.isRelease) {
      await context.runner.exec('yarn build:runtime');
    } else {
      await context.runner.exec('yarn build --progress=false');
    }
  }
});
