#!/usr/bin/env node
import deleteFilesInFolder from "@services/deleteFilesInFolder";
import scheduleDeleteFilesInFolder from "@services/scheduleDeleteFilesInFolder";
import validateAndStoreFoldersPath from "@services/validateAndStoreFoldersPath";
import { COMMA_SEPARATOR } from "@utils/constants";
import logOutput from "@utils/logOutput";
import { error } from "console";
import path from "path";
import { cwd } from "process";

import command from "./command";

async function main() {
  try {
    void logOutput("Starting...");

    const currentDirPath = cwd();
    const programOptions = command.opts();
    const [folders] = command.args;

    const foldersPath = folders
      .split(COMMA_SEPARATOR)
      .map((folder) => path.join(currentDirPath, folder));

    void logOutput("Get folders path...");

    const shouldStoreFoldersPath = Boolean(programOptions?.schedule);

    void logOutput("Validating and saving folders path...");

    await validateAndStoreFoldersPath(foldersPath, shouldStoreFoldersPath);

    if (programOptions?.schedule) {
      void logOutput("Deleting by schedule...");
      void scheduleDeleteFilesInFolder(programOptions.schedule);

      return;
    }

    await deleteFilesInFolder(foldersPath);
  } catch (traceError) {
    error(traceError);
    return;
  }
}

main();
