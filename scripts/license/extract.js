const checker = require('license-checker');
const path = require('path');
const fs = require('fs');

const licenses = {
  'MIT': {
    url: 'https://opensource.org/licenses/MIT',
  },
  '0BSD': {
    url: 'https://opensource.org/licenses/0BSD',
  },
  'Apache-2.0': {
    url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
  },
  'OFL-1.1': {
    url: 'http://scripts.sil.org/OFL',
  },
};

const overrides = {
  'blueriq-material@1.0.0': [],
  'ng2-file-upload@1.4.0': {
    repository: 'https://github.com/valor-software/ng2-file-upload',
    licenses: 'MIT',
  },
  'font-awesome@4.7.0': [{
    repository: 'https://github.com/FortAwesome/Font-Awesome',
    licenses: 'OFL-1.1',
    variant: 'font',
  }, {
    repository: 'https://github.com/FortAwesome/Font-Awesome',
    licenses: 'MIT',
    variant: 'style',
  }],
};

const rootDir = path.resolve(__dirname, '..', '..');

checker.init({
  start: rootDir,
  production: true,
}, (err, packages) => {
  if (err) {
    console.error('License extraction failed', err);
    process.exit(1);
  }

  let output = '';
  const append = (row) => output += row + '\n';

  append('||Name||License||Version||');
  const effectivePackages = { ...packages, ...overrides };
  const packageIdentifiers = Object.keys(effectivePackages);
  packageIdentifiers.sort();
  for (const packageIdentifier of packageIdentifiers) {
    const stats = effectivePackages[packageIdentifier];

    if (Array.isArray(stats)) {
      stats.forEach(variant => append(row(packageIdentifier, variant)));
    } else {
      append(row(packageIdentifier, stats));
    }
  }

  console.log(output);
  fs.writeFileSync(path.resolve(rootDir, '3rd-party-licenses.txt'), output);
});

function row(packageIdentifier, stats) {
  const versionSplit = packageIdentifier.lastIndexOf('@');
  const packageName = packageIdentifier.substring(0, versionSplit);
  const version = packageIdentifier.substring(versionSplit + 1);

  let repository;
  let licenseColumn;
  if (packageIdentifier.startsWith('@blueriq/')) {
    repository = 'https://my.blueriq.com/display/DOC/Angular';
    licenseColumn = 'Proprietary';
  } else {
    repository = stats.repository;

    const license = licenses[stats.licenses];
    licenseColumn = license ? `[${stats.licenses}|${license.url}]` : stats.licenses;
  }

  const packageUrl = repository ? `[${packageName}|${repository}]` : packageName;
  const packageColumn = stats.variant ? `${packageUrl} (${stats.variant})` : packageUrl;

  return `|${packageColumn}|${licenseColumn}|${version}|`;
}
