import logOutput from "@utils/logOutput";
import { error } from "console";
import { readdir, unlink } from "fs/promises";
import path from "path";

async function getDirectoryFilesFromFolderPath(folderPath: string) {
  return readdir(folderPath, {
    withFileTypes: true,
  });
}

export default async function (foldersPaths: string[]) {
  try {
    const promiseGetAllDirectoryFiles = foldersPaths.flatMap((folderPath) =>
      getDirectoryFilesFromFolderPath(folderPath)
    );

    const directoryFiles = (
      await Promise.all(promiseGetAllDirectoryFiles)
    ).flat();

    const hasDirectoryFiles = directoryFiles.length;

    if (!hasDirectoryFiles) {
      logOutput("All files already deleted!");

      return;
    }

    for (const directoryFile of directoryFiles) {
      const fileAndDirectoryPath = path.join(
        directoryFile.path,
        directoryFile.name
      );

      await unlink(fileAndDirectoryPath);
    }

    logOutput("All files were deleted successfully");
  } catch (traceError) {
    error("Remove files and folders", {
      traceError,
    });
  }
}
