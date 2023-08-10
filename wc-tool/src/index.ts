#!/usr/bin/env node
import { optionsSupported } from "./config";
import { commandLine } from "./lib/yargs";
import { Commands } from "./services/commands";

async function main() {
  const argsParsed = await commandLine.parse();
  const commands = new Commands();

  const argsEntries = Object.entries(argsParsed);

  for (const [key, value] of argsEntries) {
    const supportedOption = optionsSupported.includes(key);

    if (supportedOption && value) {
      return commands[key](value);
    }
  }

  const [defaultCommandValue] = argsParsed._;
  return commands.default(defaultCommandValue as string);
}

main();
