import {
  BREAK_LINE_SEPARATOR,
  LOG_DIR_PATH,
  LOG_FILE_NAME,
  UTF8_ENCODING,
  WRITE_FILE_FLAG,
} from "@utils/constants";
import createDirectoryIfNotExists from "@utils/createDirectoryIfNotExists";
import { info } from "console";
import { opendir, writeFile } from "fs/promises";
import path from "path";

/**
 * Check if folders paths are valid and persist in log.txt if necessary.
 * @param {string[]} foldersPath - All folders paths
 * @param {boolean} persist - Whether store folders paths at log.txt file or not
 * @returns {Promise<void>}
 * */
export default async function (
  foldersPath: string[],
  persist: boolean = false
): Promise<void> {
  try {
    for (const folderPath of foldersPath) {
      const dir = await opendir(folderPath);
      dir.closeSync();
    }

    info("All folders checked");

    if (persist) {
      createDirectoryIfNotExists(LOG_DIR_PATH);

      const logFilePath = path.join(LOG_DIR_PATH, LOG_FILE_NAME);

      await writeFile(logFilePath, foldersPath.join(BREAK_LINE_SEPARATOR), {
        flag: WRITE_FILE_FLAG,
        encoding: UTF8_ENCODING,
      });
    }

    return;
  } catch (error) {
    console.error(error);
    throw new Error("Something goes wrong!");
  }
}
