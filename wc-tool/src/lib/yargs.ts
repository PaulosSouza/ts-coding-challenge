import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { optionsSupported } from "../config";
import getStdin from "../helpers/getStdin";
import resolveFilePathOrText from "../transforms/resolveFilePathOrText";

export const commandLine = yargs(hideBin(process.argv))
  .command(
    "$0",
    "",
    (yargs) => {
      return yargs.options({
        bytes: {
          type: "string",
          alias: "c",
          description: "print the byte counts",
          coerce: resolveFilePathOrText,
        },
        lines: {
          type: "string",
          alias: "l",
          description: "print the newline counts",
          coerce: resolveFilePathOrText,
        },
        words: {
          type: "string",
          alias: "w",
          description: "print the words counts",
          coerce: resolveFilePathOrText,
        },
        chars: {
          type: "string",
          alias: "m",
          description: "print the character counts",
          coerce: resolveFilePathOrText,
        },
      });
    },
    async (args) => {
      const argsEntries = Object.entries(args);

      for (const [key, value] of argsEntries) {
        const supportedOption = optionsSupported.includes(key);
        const hasFileTransformed = (value as any)?.file?.name;

        if (supportedOption && !hasFileTransformed) {
          (args[key] as any).stdin = await getStdin();
        }
      }
    }
  )
  .help();