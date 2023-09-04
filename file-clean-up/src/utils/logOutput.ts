import { appendFile } from "fs/promises";
import path from "path";

import { LOG_DIR_PATH, OUTPUT_FILE_NAME } from "./constants";
import createDirectoryIfNotExists from "./createDirectoryIfNotExists";

export default async function (data: string) {
  try {
    const outputPath = path.join(LOG_DIR_PATH, OUTPUT_FILE_NAME);

    createDirectoryIfNotExists(LOG_DIR_PATH);

    await appendFile(outputPath, `${data} \n`);
  } catch {
    console.error("Something goes wrong");
  }
}
