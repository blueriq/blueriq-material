import * as child_process from 'node:child_process';
import * as fs from 'node:fs/promises';
import * as process from 'node:process';

const [host, spec] = process.argv.slice(2);

await fs.mkdir('cypress/report/mochareports', { recursive: true });

function runCommand(command) {
  console.log(command);
  return child_process.spawnSync(command, {
    stdio: 'inherit',
    shell: true,
  });
}

const cypress = runCommand(`cypress run --config baseUrl=http://${host}:9081 --spec ${spec} --browser chrome`);
const report = runCommand(`yarn e2e:reporting`);
if (report.status !== 0) {
  process.exit(report.status);
}

process.exit(cypress.status);
