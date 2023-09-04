import {
  BREAK_LINE_SEPARATOR,
  LOG_DIR_PATH,
  LOG_FILE_NAME,
  UTF8_ENCODING,
} from "@utils/constants";
import logOutput from "@utils/logOutput";
import { CronJob } from "cron";
import { readFileSync } from "fs";
import path from "path";

import deleteFilesInFolder from "./deleteFilesInFolder";

export default function (schedule: string | Date) {
  function getStoredFoldersAndDelete() {
    const now = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(new Date());

    void logOutput(`Run getStoredFoldersAndDelete method now: ${now}`);

    const logFilePath = path.join(LOG_DIR_PATH, LOG_FILE_NAME);
    void logOutput(`Path: ${logFilePath}`);

    const logFile = readFileSync(logFilePath, {
      encoding: UTF8_ENCODING,
    });

    const foldersPath = logFile.split(BREAK_LINE_SEPARATOR);

    void deleteFilesInFolder(foldersPath);
  }

  new CronJob(
    schedule,
    () => getStoredFoldersAndDelete(),
    null,
    true,
    "America/Sao_Paulo",
    {},
    false,
    undefined,
    undefined
  );
}
