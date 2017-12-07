#!/usr/bin/env node

const argv = require('yargs')
  .option('n', {
    alias: 'name',
    demand: true,
    default: 'world',
    describe: 'your name',
    type: 'string'
  })
  .usage('Usage: hello [options]')
  .example('hello -n Thomson', 'say hello to Tom')
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2017')
  .argv;

console.log('hello ', argv.name);