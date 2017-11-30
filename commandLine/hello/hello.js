#!/usr/bin/env node

require('shelljs/global');

if (!which('git')) {
  echo('');
  exit(1);
}

mkdir('-p', 'out/Release');
cp('-R', 'stuff/*', 'out/Release');

cd('lib');
ls('*.js').forEach(function(file) {
  sed('-i', 'v0.1.2', 'v0.1.2', file);
  sed('-i', /.*REMOVE_THIS_LINE.*\n/, '', file);
  sed('-i', /.*REPLACE_LINE_WITH_MACRO.*\n/, cat('macro.js'), file);
});
cd('..');

if (exec('git commit -am "Auto-commit"').code !== 0) {
  echo('Error: Git commit failed');
  exit(1);
}